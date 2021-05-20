const express = require('express');
const router = express.Router();
const mainCtrl = require('../controllers/main');

router.get('/', mainCtrl.main);

module.exports = router;