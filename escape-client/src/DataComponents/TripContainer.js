import {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';

import {fetchTripProfile} from '../services/trip-service';

import './css/tripPlanner.css';

import NewTripForm from './NewTripForm';
import Map from './Map.js';

export default function TripContainer(props) {

    const [tripState, setTripState] = useState();

    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/
   

    /*######################################
    ######################################
    LOGIC / FUNCTIONS
    ######################################
    ######################################*/
    
    
    const {id} = useParams();

    // useEffect(() => {
    //     async function fetchTrip() {
    //         const data = await fetchTripProfile(id)
    //         setTripState(data)
    //     }
    //     fetchTrip();
    // }, [id]);

    async function fetchTrip() {
        try {
            const data = await fetchTripProfile(id);
            console.log(data)
            setTripState(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useLayoutEffect(() => {
        fetchTrip();
    }, [id])

    /*######################################
    ######################################
    RETURN
    ######################################
    ######################################*/
    return(
        <div className="trip-main-container">
            <div className="accordionContainer">
                {/* <TabPanel user={props.user} trip={tripState} /> */}
                {/* Link to create a new trip form */}
                {/* <NewTripForm user={props.user}/> */}
            </div>
            <div className="mapContainer">
                <h2>{tripState ? tripState.name : 'Trips!'}</h2>
                <Map trip={tripState} trip_id={id}/> 
            </div>
        </div> 
    )
}