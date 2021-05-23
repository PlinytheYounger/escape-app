const Trip = require('../models/trip');
const Travel = require('../models/travel');
require('dotenv').config();

module.exports = {
    newTravel,
    editTravel,
    deleteTravel,
    getTravel
};

function newTravel(req, res) {
    console.log(req.body);
    console.log(req.params);
    Trip.findById(req.params.trip_id, (err, foundTrip) => {
        Travel.create(req.body, (err, newTravel) => {
            foundTrip.travel_ids.push(newTravel.id);
            foundTrip.save((err) => {
                res.json(newTravel);
            });
        })
    })
}

function editTravel() {

}

function deleteTravel() {

}

function getTravel(req, res) {
    console.log(req.params.travel_id);
    Travel.findById(req.params.travel_id, (err, foundTravel) => {
        res.json(foundTravel)
    })
}