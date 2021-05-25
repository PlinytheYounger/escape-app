const express = require('express');
const router = express.Router();
const walletCtrl = require('../controllers/wallet');

router.post('/:trip_id/new/:user_id', walletCtrl.newWallet)
router.post('/new/:wallet_id', walletCtrl.newExpense);
router.get('/:trip_id/:user_id', walletCtrl.getWallet);

module.exports = router;