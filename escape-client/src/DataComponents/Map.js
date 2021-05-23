// import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useEffect, useState, useRef} from 'react';
import {fetchTripProfile} from '../services/trip-service';
import {getMap} from '../services/map-service';
// import env from "react-dotenv";
import './css/tripPlanner.css';



export default function MapComponent(props) {
    const [getMapData, setMapData] = useState();
    
    const mapStyles = {
        height: "100%",
        width: "100%",
        border: "0"
    }

    // const API_KEY = env.API_KEY;
    // const defaultCenter = {
    //     lat: 41.3851, lng: 2.1734
    // }

    function findMapData(data) {
        let origin = (data && data.starting_location).replace(" ","");
        let destination = (data && data.ending_location).replace(" ","");
        let waypoints = [];
        for(let activity of data.activity_ids) {
            waypoints.push(activity)
        }
        for(let travel of data.travel_ids) {
            waypoints.push(travel)
        }
        setMapData({
            origin: origin,
            destination: destination,
            waypoints: waypoints 
        })
    }    

    let map = useRef();

    useEffect(() => {
        function fetchTrip() {
            findMapData(props.trip);
            setMapData({
                ...getMapData,
                url: map
            })
        }
        fetchTrip();
    }, [getMapData, props.trip_id, map]);

    return(
        <div className="map-component-container">
            <iframe
                title="map"
                style={mapStyles}
                loading="lazy"
                allowFullScreen
                src={getMapData && getMapData.url}>
            </iframe>
        </div>
    )
}