const Trip = require('../models/trip');
const User = require('../models/user');
require('dotenv').config();

module.exports = {
    newTrip,
    editTrip,
    deleteTrip,
    getTrip
};

function newTrip(req, res) {
    User.findById(req.params.id, (err, foundUser) => {
        Trip.create(req.body, (err, newTrip) => {
            foundUser.trip_ids.push(newTrip._id);
            foundUser.save((err) => {
                res.json(newTrip);
            });
        })
    })
}

function editTrip() {

}

function deleteTrip(req, res) {
    console.log(req.params.id)
    Trip.deleteOne({id: req.params.id}, (err, deletedTrip) => {
        res.json(deletedTrip)
    })
}

function getTrip(req, res) {
    Trip.findById(req.params.id).populate('activity_ids').populate('travel_ids').exec(function(err, foundTrip) {
        res.json(foundTrip);
    })
}