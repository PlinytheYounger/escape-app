import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../services/user-service.js'
// import './signupform.css';

export default function SignupForm (props) {
  const history = useHistory();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  function handleChange(e) {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      console.log(formState)
      await signup(formState);
      props.handleSignup();
      // history.push('/')
    } catch (err) {
      // Invalid user data (probably duplicate email)
      console.log(err.message);
    }
  }

//   function isFormInvalid() {
//     return !(formState.name && formState.email && formState.password === formState.passwordConf);
//   }

    return (
      <div>
        <h2 className="h2Style">Sign Up</h2>
        <form className="containerStyle" autoComplete="off" onSubmit={handleSubmit} >
          <input 
         
            className="standard-search" 
            placeholder="Name" 
            value={formState.name} 
            name="name" 
            onChange={handleChange}
          />
          <input 
         
            className="standard-search" 
            placeholder="Email" 
            value={formState.email} 
            name="email" 
            onChange={handleChange}
            type="email"
          />
          <input 
          
            autoComplete="current-password"
            className="standard-password-input" 
            placeholder="Password" 
            value={formState.password} 
            name="password" 
            onChange={handleChange}
            type="password"
          />
          <input 
            required 
            className="standard-password-input" 
            placeholder="Confirm Password" 
            value={formState.passwordConf} 
            name="passwordConf" 
            onChange={handleChange}
            type="password"
          />
          <div>
            <div>
              <button className="h2Style" type="submit" >Sign Up</button>
              {/* <Link to='/'><Button> Cancel</Button></Link> */}
            </div>
          </div>
        </form>
      </div>

    );
}