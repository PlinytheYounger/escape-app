import {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';

import {fetchTripProfile} from '../services/trip-service';

import './css/tripPlanner.css';

import Map from './Map.js';
import PanelContainer from './PanelContainer.js';
export default function TripContainer(props) {

    const [tripState, setTripState] = useState();

    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/
    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        height: "80vh",
        width: "100vw",
        alignItems: "center"
    }

    const leftContainerStyle = {
        width: "45%",
    }

    const rightContainerStyle = {
        width: "55%"
    }

    /*######################################
    ######################################
    LOGIC / FUNCTIONS
    ######################################
    ######################################*/
    
    
    const {id} = useParams();

    async function fetchTrip() {
        try {
            const data = await fetchTripProfile(id);
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
        <div style={containerStyle}>
            <div style={leftContainerStyle}>
                <PanelContainer user={props.user} trip={tripState} />
            </div>
            <div style={rightContainerStyle}>
                <h2>{tripState ? tripState.name : 'Trips!'}</h2>
                <Map trip={tripState} trip_id={id}/> 
            </div>
        </div> 
    )
}