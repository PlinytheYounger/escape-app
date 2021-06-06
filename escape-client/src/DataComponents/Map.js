// import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useLayoutEffect, useState, useRef} from 'react';
import {getMap} from '../services/map-service';
import Grid from '@material-ui/core/Grid';



export default function MapComponent(props) {
    const [getMapData, setMapData] = useState();
    
    const mapStyles = {
        height: "100%",
        width: "100%",
        border: "0"
    }

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

    //----> TODO: Create markers to map out trip waypoints

    //----> variable store current map value in ref
    let map = useRef();

    //----> Function to fetch src url from backend and assign to map.current ref & clean up data to save to state
    async function fetchTrip() {
        try {
            const data = await findMapData(props.trip);
            map.current = await getMap(props.trip_id)
            setMapData({
                ...getMapData,
                url: map.current
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    //----> Function to lazy load page data
    useLayoutEffect(() => {
        fetchTrip();
    }, [props, map])

    return(
        <iframe
            title="map"
            style={mapStyles}
            loading="lazy"
            allowFullScreen
            src={getMapData && getMapData.url}>
        </iframe>
    )
}