import {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
        alignItems: "top"
    }

    // const leftContainerStyle = {
    //     width: "50%",
    // }

    // const rightContainerStyle = {
    //     width: "50%",
    //     height: "100%"
    // }

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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={leftContainerStyle}>
                    <PanelContainer user={props.user} trip={tripState} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>{tripState ? tripState.name : 'Trips!'}</h2>
                    <Map trip={tripState} trip_id={id}/> 
                </Grid>
            </Grid>
        </div> 
    )
}