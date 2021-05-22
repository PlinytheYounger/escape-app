import './App.css';
import {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {getUser, logout} from './services/user-service';
import SignUpForm from './DataComponents/SignUpForm.js';
import Home from './PresoComponents/Home';
import Header from './PresoComponents/Header';
import Footer from './PresoComponents/Footer';
// import Home from './Components/Home/Home.js';
// import UserProfile from './Components/UserProfile/UserProfile.js';
// import TripPlanner from './Components/TripPlanner/TripPlanner.js';
// import SignupForm from './Components/UserProfile/SignupForm.js';
// import LoginForm from './Components/UserProfile/LoginForm.js';
// import NewTripForm from './Components/TripPlanner/NewTripForm.js';
// import ActivityShow from './Components/TripPlanner/Activities/ActivityShow.js';
// import TravelShow from './Components/TripPlanner/Travel/TravelShow.js';

function App(props) {

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

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleLogout={handleLogout} handleLogin={handleLogin} handleSignup={handleSignup} user={userState.user}/>
        <div className="app-container">
            <Switch>
                {/* Add path logic to redirect if user is not logged in to login page */}
                {/* <Route path="/user/:id">
                    <UserProfile user={userState.user} {...props}/>
                </Route>
                <Route path="/trip/:id">
                    <TripPlanner user={userState.user} {...props}/>
                </Route>
                <Route path="/trip">
                    <NewTripForm user={userState.user} {...props}/>
                </Route>
                <Route path="/activity/:activity_id">
                  <ActivityShow {...props} user={userState.user}/>
                </Route>
                <Route path="/travel/:travel_id">
                  <TravelShow {...props} user={userState.user}/>
                </Route> */}
                <Route path="/new_user/signup">
                    <SignUpForm {...props} handleLogout={handleLogout} handleSignup={handleSignup}/>
                </Route>
                {/* <Route path="/login">
                    <LoginForm {...props} handleLogout={handleLogout} handleLogin={handleLogin}/>
                </Route> */}
                <Route path="/">
                    <Home {...props} user={userState.user}/>
                </Route>
            </Switch>
        </div>
        <Footer handleLogout={handleLogout} handleLogin={handleLogin}/> 
      </BrowserRouter>
    </div>
  );
}

export default App;
