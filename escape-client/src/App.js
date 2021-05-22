import './App.css';
import {useState, useEffect} from 'react';
import {fetchMain} from './services/main-service.js';
import SignUpForm from './DataComponents/SignupForm.js';
import {getUser, logout} from './services/user-service';

function App(props) {

  const [getState, setState] = useState();
  const [userState, setUserState] = useState({user: getUser()});

  const handleLogout = () => {
    logout();
    setUserState({user: null})
  }

  const handleLogin = () => {
    setUserState({user: getUser()})
  }

  const handleSignup = () => {
    setUserState({user: getUser()});
  }

  // useEffect(() => {
  //   async function getMain() {
  //     const data = await fetchMain();
  //     console.log(data)
  //     setState({phrase: data});
  //   }
  //   getMain();
  // }, [])

  return (
    <div className="App">
      <h1>Escape</h1>
      <SignUpForm {...props} handleLogout={handleLogout} handleSignup={handleSignup}/>
    </div>
  );
}

export default App;
