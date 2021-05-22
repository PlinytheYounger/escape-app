import './css/header.css';
import {Link} from 'react-router-dom';


export default function Header(props) {

    // Ternary conditional to update the header based on whether a user is logged in or not
    let updateNav = props.user ? 
        <>
        <button className="buttonTheme">
            <Link className="linkTheme" to="" > Hi, {props.user.name}</Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/trip" user={props.user}>Start New Trip</Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to={`/user/${props.user._id}`}>Profile</Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="" onClick={props.handleLogout}> Logout </Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/">Explore</Link>
        </button>
        </>
        :
        <>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/new_user/signup"> Signup </Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/login"> Login </Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/trip">Trip Planner</Link>
        </button>
        <button className="buttonTheme">
            <Link className="linkTheme" to="/">Explore</Link>
        </button>
        </>


    return (
        <header position="static" className="barTheme">
            <div className="titleName">
                <Link className="linkTheme" to="/">
                    <h2 className="titleTheme">Escape</h2>
                </Link>
            </div>
            <div className="navBar">
                {updateNav}
            </div>
        </header>
    )
}