const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activities.js');

// Activity routes
router.post('/new/:trip_id', activityCtrl.newActivity);
router.get('/:activity_id', activityCtrl.getActivity);
router.post('/:activity_id/edit/:trip_id', activityCtrl.editActivity);
router.get('/:activity_id/delete', activityCtrl.deleteActivity);


module.exports = router;