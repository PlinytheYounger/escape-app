import {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import {fetchTripProfile} from '../services/trip-service';

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
        flexDirection: "column",
        height: "80vh",
        width: "100vw",
        alignItems: "center"
    }

    const mainStyle={
        height: "90%",
        width: "100%",
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-around"
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
            <h2>{tripState ? tripState.name : 'Trips!'}</h2>
            <main style={mainStyle}>
                <PanelContainer user={props.user} trip={tripState} />
                <Map trip={tripState} trip_id={id}/> 
            </main>
        </div>
    )
}