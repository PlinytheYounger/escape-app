const fetch = require("node-fetch");
const Trip = require('../models/trip');
const Activity = require('../models/activity');
const Travel = require('../models/travel');
require('dotenv').config();


function getMap(req, res) {

    const API_KEY = process.env.G_API_KEY;

    Trip.findById(req.params.trip_id, (err, foundTrip) => {

        let origin = (foundTrip.starting_location).replace(" ","");
        let destination = (foundTrip.ending_location).replace(" ","");
        let gUrl = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${foundTrip.starting_location}&destination=${foundTrip.ending_location};`;
        
        let waypoints = [];

        for(let i = 0; i < foundTrip.activity_ids.length; i++) {
            let activity = foundTrip.activity_ids[i];
            Activity.findById({_id: activity}, (err, foundActivity) => {
                waypoints.push(foundActivity.location)
            })
        }

        for(let i = 0; i < foundTrip.travel_ids.length; i++) {
            let travel = foundTrip.travel_ids[i];
            Travel.findById({_id: travel}, (err, foundTravel) => {
                waypoints.push(foundTravel.ending_location);
            })
        }
        
        for(let i = 0; i < waypoints.length; i++) {
            if(waypoints.length > 1 && i === 0) {
                gUrl += `&waypoints=${waypoints[i].replace(" ", "")}|`
            } else if(waypoints.length === 1 && i === 0) {
                gUrl += `&waypoints=${waypoints[i].replace(" ", "")}`
            } else if(i < waypoint.length - 1) {
                gUrl += `${waypoints[i].replace(" ","")}|`
            } else if(i === waypoint.length -1) {
                gUrl += `${waypoints[i].replace(" ","")}`
            }
        }

        if(err) {
            console.log(err)
        } else {
            res.json(gUrl);
        }
    })
}

module.exports = {
    getMap
};