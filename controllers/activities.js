const Trip = require('../models/trip');
const Activity = require('../models/activity');
require('dotenv').config();

module.exports = {
    newActivity,
    editActivity,
    deleteActivity,
    getActivity
};

function newActivity(req, res) {
    console.log(req.body);
    console.log(req.params);
    Trip.findById(req.params.trip_id, (err, foundTrip) => {
        Activity.create(req.body, (err, newActivity) => {
            foundTrip.activity_ids.push(newActivity.id);
            foundTrip.save((err) => {
                res.json(newActivity);
            });
        })
    })
}

function getActivity(req, res) {
    console.log(req.params.activity_id);
    Activity.findById(req.params.activity_id, (err, foundActivity) => {
        res.json(foundActivity)
    })
}

function editActivity() {

}

function deleteActivity() {

}