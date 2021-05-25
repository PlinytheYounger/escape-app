import {fetchTravel} from '../../../services/travelService.js';
import {useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router';
import Button from '@material-ui/core/Button';

export default function TravelShow() {
    const [travelState, setTravelState] = useState();

    const {travel_id} = useParams();

    const getTravelProfile = useCallback(() => {
        let data = fetchTravel(travel_id);
        setTravelState(data);
    },[travel_id]);

    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        return newDate;
    }

    useEffect(() => {
        getTravelProfile();
    },[getTravelProfile])

    return(
        <div>
            <Button>Back to Trip</Button>
            <h2> {travelState && travelState.name}</h2>
            <h3> {travelState && travelState.location}</h3>
            <h3>{changeDate(travelState && travelState.date)}</h3>
            <Button>Edit Travel</Button>
        </div>

    )
}