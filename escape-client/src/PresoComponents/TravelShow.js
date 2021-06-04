import {fetchTravel} from '../services/travel-service.js';
import {useLayoutEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function TravelShow() {
    const [travelState, setTravelState] = useState();

    const {travel_id} = useParams();

    async function getTravelProfile() {
        let data = fetchTravel(travel_id);
        setTravelState(data);
    };

    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        console.log(newDate)
        return newDate;
    }
    let history = useHistory();


    useLayoutEffect(() => {
        getTravelProfile();
    },[travel_id])

    return(
        <div>
            <Button className="act-button" onClick={history.goBack}>Back to Trip</Button>
            <h2> {travelState && travelState.name}</h2>
            <h3> {travelState && travelState.location}</h3>
            <h3>{changeDate(travelState && travelState.date)}</h3>
            <Button>Edit Travel</Button>
        </div>

    )
}