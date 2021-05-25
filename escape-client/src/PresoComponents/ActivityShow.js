import {fetchActivity} from '../../../services/activityService.js';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import './css/activity.css';

export default function ActivityShow() {
    const [activityState, setActivityState] = useState();

    const {activity_id} = useParams();

    const getActivityProfile = useCallback(() => {
        let data = fetchActivity(activity_id);
        setActivityState(data);
    },[activity_id]);

    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        return newDate;
    }
    let history = useHistory();

    useEffect(() => {
        getActivityProfile();
    },[getActivityProfile])

    return(
        <div className="activity-container">
            <div className="background-image-activity">
                <button className="act-button" onClick={history.goBack}>Back to Trip</button>
            </div>
            <main>
                <Typography variant="h6">
                <h2>{activityState && activityState.name}</h2>
                </Typography>
                <h3>{activityState && activityState.location}</h3>
                <h3>{changeDate(activityState && activityState.date)}</h3>
                <button className="act-button">Edit Activity</button>
            </main>
        </div>

    )
}