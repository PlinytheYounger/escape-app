import {useState, useEffect, useLayoutEffect} from 'react';
import {fetchUserProfile} from '../services/user-service';
// import {deleteTrip} from '../../services/tripService';
import {Link} from 'react-router-dom';
import './css/userprofile.css';
import {useSSE} from 'use-sse';

export default function UserProfile(props) {
    
    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/

    const main_container_style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",

    }

    const user_details_container_style = {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "48%",
        marginBottom: "40px"
    }

    const accordion_style = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    }

    const accordion_style_two = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column"
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


    // function deleteTrip(id) {
    //     console.log(id)
    //     // event.preventDefault();
    //     const data = deleteTrip(id);    
    //     console.log(data);
    // }

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

    return(
        <div className="profile_container" style={main_container_style}>
            <div className="user_details_container" style={user_details_container_style}>
                <div className="user_image">
                    <h1>Placeholder for image</h1>
                </div>
                <div>
                    <h2>Welcome back, {props.user.name}</h2>
                    <h2>Email: {props.user.email}</h2>
                </div>
                
            </div>
            <div className="user_information" >
                <div className={"userPhotos", "accordionContainer"} expanded={expanded === 'panel1' onChange={handleChange('panel1')}>
                        <h2>Photo Gallery</h2>
                    <div className="accordionMain">
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

                </div>
                        
                        <h2>Saved Trips</h2>
                        {/* </AccordionSummary>
                        <AccordionDetails style={accordion_style_two}> */}
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
                        {/* </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        > */}
                        <h2>Past Trips</h2>
                        {/* </AccordionSummary>
                        <AccordionDetails > */}
                        <h3>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </h3>
                        {/* </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                        > */}
                        <h2>Messages</h2>
                        {/* </AccordionSummary>
                        <AccordionDetails > */}
                        <h3>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </h3>
                        {/* </AccordionDetails>
                    </Accordion> */}
                </div>
        </div>
    )
}