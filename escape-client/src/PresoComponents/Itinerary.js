import {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router';
import {fetchTripProfile} from '../services/trip-service';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';


export default function Itinerary(props) {
    const {id} = useParams();

    const [itineraryState, setItineraryState] = useState();


    const changeDate = (date) => {
        let newDate = new Date(date).toLocaleDateString();
        return newDate;
    }

    const location = (stop) => {
        if(stop.location) return stop.location;

        if(stop.starting_location && stop.ending_location) {
            return `${stop.starting_location} to ${stop.ending_location}`;
        }
    }

    let timeline = itineraryState && itineraryState.stops[0].map((stop) => {
        return(
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography color="textSecondary">{changeDate(stop.date)}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot variant="outlined"/>
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{`${stop.name} | ${location(stop)}`} </TimelineContent>
            </TimelineItem>
        )
    })

async function getTripProfile() {
    let data = await fetchTripProfile(id);
    if(data) {
        let newArr = [];
        for(let a of data.activity_ids) {
            newArr.push(a);
        }
        for(let t of data.travel_ids) {
            newArr.push(t);
        }

        newArr.sort(function(a,b) {
            let dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB;
        })
        setItineraryState({
                origin: data.starting_location,
                destination: data.ending_location,
                start_date: data.start_date,
                end_date: data.end_date,
                stops: [newArr]            
        })
    }
};

    useLayoutEffect(() => {
        getTripProfile();
    },[id])

    return(
        <div>
            <Timeline align="right">
                <TimelineItem>
                    <TimelineOppositeContent>
                        <Typography color="textSecondary">{itineraryState && changeDate(itineraryState.start_date)}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{itineraryState && itineraryState.origin}</TimelineContent>
                </TimelineItem>
                {timeline}
                <TimelineItem>
                    <TimelineOppositeContent>
                        <Typography color="textSecondary">{itineraryState && changeDate(itineraryState.end_date)}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    </TimelineSeparator>
                    <TimelineContent>{itineraryState && itineraryState.destination}</TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}