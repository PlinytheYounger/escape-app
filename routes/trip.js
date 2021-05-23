const express = require('express');
const router = express.Router();
const tripCtrl = require('../controllers/trip.js');

// Trip routes
router.post('/edit/:id', tripCtrl.editTrip)
router.delete('/delete/:id', tripCtrl.deleteTrip);
router.post('/new/:id', tripCtrl.newTrip);
router.get('/:id', tripCtrl.getTrip)


module.exports = router;
