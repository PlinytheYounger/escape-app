import {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {getUser, logout} from './services/user-service';
import SignUpForm from './DataComponents/SignUpForm.js';
import Home from './PresoComponents/Home';
import Header from './PresoComponents/Header';
import Footer from './PresoComponents/Footer';
import UserProfile from './DataComponents/UserProfile.js';
import TripContainer from './DataComponents/TripContainer.js';
import LoginForm from './DataComponents/LoginForm.js';
import NewTripForm from './DataComponents/NewTripForm.js';
import ActivityShow from './PresoComponents/ActivityShow.js';
import TravelShow from './PresoComponents/TravelShow.js';

function App(props) {

  const appStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
  }

  const [userState, setUserState] = useState({user: getUser()});
  const [showChild, setShowChild] = useState(false);

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

  useEffect(() => {
    setShowChild(true);
  }, []);

  if(!showChild) {
    return null;
  }

  return (
    <div style={appStyle}>
      <BrowserRouter>
        <Header handleLogout={handleLogout} handleLogin={handleLogin} handleSignup={handleSignup} user={userState.user}/>
        <div className="app-container">
            <Switch>
                {/* Add path logic to redirect if user is not logged in to login page */}
                <Route path="/trip/:id">
                    <TripContainer user={userState.user} {...props}/>
                </Route>
                <Route path="/user/:id">
                    <UserProfile user={userState.user} {...props}/>
                </Route>
                <Route path="/trip">
                    <NewTripForm user={userState.user} {...props}/>
                </Route>
                <Route path="/api/activity/:activity_id">
                  <ActivityShow {...props} user={userState.user}/>
                </Route>
                <Route path="/api/travel/:travel_id">
                  <TravelShow {...props} user={userState.user}/>
                </Route>
                <Route path="/new_user/signup">
                    <SignUpForm {...props} handleLogout={handleLogout} handleSignup={handleSignup}/>
                </Route>
                <Route path="/login">
                    <LoginForm {...props} handleLogout={handleLogout} handleLogin={handleLogin}/>
                </Route>
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
