import './App.css';
import {useState, useEffect} from 'react';
import {fetchMain} from '../services/main-service.js';


function App() {

  const [getState, setState] = useState();
  // const [userState, setUserState] = useState({user: getUser()});

  // const handleLogout = () => {
  //   logout();
  //   setUserState({user: null})
  // }

  // const handleLogin = () => {
  //   setUserState({user: getUser()})
  // }

  // const handleSignup = () => {
  //   setUserState({user: getUser()});
  // }

  useEffect(() => {
    async function getMain() {
      const data = await fetchMain();
      console.log(data)
      setState({phrase: data});
    }
    getMain();
  }, [])

  return (
    <div className="App">
      <h2>Hello ze world!</h2>
      <h2>{getState && getState.phrase}</h2>
    </div>
  );
}

export default App;
