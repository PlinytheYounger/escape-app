import {fetchActivity} from '../services/activity-service.js';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './css/activity.css';

export default function ActivityShow() {
    const [activityState, setActivityState] = useState();

    const {activity_id} = useParams();

    async function getActivityProfile() {
        let data = fetchActivity(activity_id);
        setActivityState(data);
    };

    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        return newDate;
    }
    let history = useHistory();

    useLayoutEffect(() => {
        getActivityProfile();
    }, [activity_id]);

    return(
        <div className="activity-container">
            <div className="background-image-activity">
                <Button className="act-button" onClick={history.goBack}>Back to Trip</Button>
            </div>
            <main>
                <Typography variant="h6">
                <h2>{activityState && activityState.name}</h2>
                </Typography>
                <h3>{activityState && activityState.location}</h3>
                <h3>{changeDate(activityState && activityState.date)}</h3>
                <Button className="act-button">Edit Activity</Button>
            </main>
        </div>

    )
}