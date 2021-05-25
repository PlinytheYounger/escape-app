import {useState, useLayoutEffect} from 'react';
import {fetchUserProfile} from '../services/user-service';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import {deleteTrip} from '../../services/tripService';
import {Link} from 'react-router-dom';
import './css/userprofile.css';

export default function UserProfile(props) {
    
    /*######################################
    ######################################
    LOGIC / FUNCTIONS
    ######################################
    ######################################*/

    const [expanded, setExpanded] = useState(false);
    const [userState, setUserState] = useState([])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    // function deleteTrip(id) {
    //     console.log(id)
    //     // event.preventDefault();
    //     const data = deleteTrip(id);    
    //     console.log(data);
    // }

    const initial = () => {
        let abbrev = props.user.name.splice(0,1);
        console.log(abbrev)
        return abbrev;
    }

    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        return newDate;
    }

    useLayoutEffect(() => {
        async function fetchUser() {
            const user = await fetchUserProfile(props.user._id)
            setUserState(user)
        }
        fetchUser();
    }, [props.user._id])


    /*######################################
    ######################################
    RETURN
    ######################################
    ######################################*/

    return(
        <div className="profile_container"zz>
            <div className="user_details_container" >
                <div className="user_image">
                    <Avatar className="avatarFont">{initial}</Avatar>
                </div>
                <div>
                    <h2>Welcome back, {props.user.name}</h2>
                    <h2>Email: {props.user.email}</h2>
                </div>
                
            </div>
            <div className="user_information" >
                <Accordion className="userPhotos accordionContainer">
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h2>Photo Gallery</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                            <div>
                                <h2>placeholder</h2>
                            </div>
                            <div>
                                <h2>placeholder</h2>
                            </div>
                            <div>
                                <h2>placeholder</h2>
                            </div>
                            <div>
                                <h2>placeholder</h2>
                            </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="userPhotos accordionContainer">
                    <AccordionSummary className="accordionMain panel2"
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <h2>Saved Trips</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                            <div className="savedTrips" >
                                {userState.trip_ids && userState.trip_ids.map((trip) => {
                                    return (
                                        <div key={trip._id}>
                                            <button className="button-user">
                                                <Link to={`/trip/${trip._id}`} className="linkStyle">
                                                        <h2 className="tripName">{trip.name}</h2>
                                                        <h2 className="tripDates">{changeDate(trip.start_date)} - {changeDate(trip.end_date)}</h2>
                                                </Link>
                                            </button>
                                            {/* <button onClick={() => deleteTrip(trip._id)}>Delete Trip</button> */}
                                        </div>
                                    )
                                })}
                            </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="userPhotos accordionContainer" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary className="accordionMain panel2"
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <h2>Past Trips</h2>
                    </AccordionSummary>
                    <AccordionDetails className="accordionMain panel3">
                        <h3>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </h3>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="userPhotos accordionContainer" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary className="accordionMain panel4"
                        aria-controls="panel4a-content"
                        id="panel3a-header"
                    >             
                        <h2>Messages</h2>
                    </AccordionSummary>
                    <AccordionDetails className="accordionMain panel4">
                        <h3>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </h3>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}