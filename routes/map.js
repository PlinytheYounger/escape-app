const express = require('express');
const fetch = require("node-fetch");
const router = express.Router();
const mapCtrl = require('../controllers/map.js');

router.get("/:trip_id", mapCtrl.getMap);



module.exports = router;