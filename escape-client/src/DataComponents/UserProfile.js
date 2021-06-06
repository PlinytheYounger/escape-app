import {useState, useLayoutEffect} from 'react';
import {fetchUserProfile} from '../services/user-service';
import {deleteTrip} from '../services/trip-service';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'; 
import {Link} from 'react-router-dom';

export default function UserProfile(props) {
    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/
    const avatarFont = {
        backgroundColor: "#c6d7b9",
        color: "#5e8d5a"
    }

    const userDetailStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        color: "#5e8d5a",
        fontFamily: "Montserrat"
    }

    const accordStyle = {
        height: "80vh",
        width: "100%",
        color: "#5e8d5a",
        fontFamily: "Montserrat"
    }

    const tripStyle = {
        color: "#5e8d5a",
        backgroundColor: "white",
        border: "2px solid #5e8d5a",
        margin: "2%",
        width: "90%",
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    }

    const tripName = {
        marginRight: "5%" 
    }

    const linkStyle = {
        textDecoration: "none",
        color: "#5e8d5a",
        fontFamily: "Montserrat"
    }

    const flexStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    }

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


    function deleteTrip(event, id) {
        console.log(event)
        console.log(id)
        const data = deleteTrip(id);    
        console.log(data);
    }

    // function editTrip(id) {
    //     console.log(id)
    //     // event.preventDefault();
    //     // const data = deleteTrip(id);    
    //     // console.log(data);
    // }

    let initial = ""

    useLayoutEffect(() => {
        async function fetchUser() {
            const user = await fetchUserProfile(props.user._id)
            setUserState(user)
            initial = user.name.slice(0,1);
        }
        fetchUser();
    }, [props.user._id])


    /*######################################
    ######################################
    RETURN
    ######################################
    ######################################*/

    return(
        <div className="profile_container">
            <div style={userDetailStyle}>
                <div className="user_image">
                    <Avatar style={avatarFont}>{initial}</Avatar>
                </div>
                <div>
                    <h2>Welcome back, {props.user.name}</h2>
                    <h2>Email: {props.user.email}</h2>
                </div>
                
            </div>
            <div style={accordStyle}>
                <Accordion className="accordionContainer">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h2>Photo Gallery</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Placeholder</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="accordionContainer">
                    <AccordionSummary className="accordionMain panel2"
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <h2>Saved Trips</h2>
                    </AccordionSummary>
                    <AccordionDetails style={flexStyle}>
                        {userState.trip_ids && userState.trip_ids.map((trip) => {
                            return (
                                <div key={trip._id} style={tripStyle}>
                                    <Link to={`/trip/${trip._id}`} style={linkStyle}>
                                            <h2 style={tripName}>{trip.name}</h2>
                                    </Link>
                                    <Button style={linkStyle}>
                                        <Link to={`/`} style={linkStyle}>Edit Trip</Link>
                                    </Button>
                                    <Button style={linkStyle}>Delete Trip</Button>
                                </div>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
                <Accordion className="accordionContainer" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary className="accordionMain panel2"
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        expandIcon={<ExpandMoreIcon />}
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
                <Accordion className="accordionContainer" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary className="accordionMain panel4"
                        aria-controls="panel4a-content"
                        id="panel3a-header"
                        expandIcon={<ExpandMoreIcon />}
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