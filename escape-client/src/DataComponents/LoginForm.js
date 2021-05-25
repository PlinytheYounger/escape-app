import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './css/signupform.css';
import {login} from '../services/user-service';

export default function LoginPage(props) {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formState)
      props.handleLogin();
      history.push('/')
      
    } catch (err) {
      console.log(err.message)
      // Use a modal or toast in your apps instead of alert
	    alert('Invalid Credentials!');
    }
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
          <input
            required 
            placeholder="Email" 
            value={formState.email} 
            name="email" 
            onChange={handleChange}
            type="email"
          />
          <input 
            required  
            autoComplete="current-password"
            placeholder="Password" 
            value={formState.password} 
            name="password" 
            onChange={handleChange}
            type="password"
          />
        <div className='buttonContainer'>
            <button className="buttonStyle" type="submit">
                <h2 className="h2Font">Login</h2>
            </button>
            <button className="buttonStyle">
                <Link to='/'>
                    <h2 className="h2Font">Cancel</h2>
                </Link>
            </button>
        </div>
      </form>
    </div>
  );
}