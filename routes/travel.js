const express = require("express");
const router = express.Router();
const travelCtrl = require('../controllers/travel.js');

// Travel routes
router.post('/new/:trip_id', travelCtrl.newTravel);
router.post('/:travel_id/edit/:trip_id', travelCtrl.editTravel);
router.get('/:travel_id/delete', travelCtrl.deleteTravel);
router.get('/:travel_id', travelCtrl.getTravel);

module.exports = router;