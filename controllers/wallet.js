const Trip = require('../models/trip');
const User = require('../models/user');
const Wallet = require('../models/wallet');
require('dotenv').config();

module.exports = {
    newExpense,
    getWallet,
    newWallet
};

function newWallet(req, res) {
    req.body.user_id = req.params.user_id;
    req.body.trip_id = req.params.trip_id;
    Wallet.create(req.body, (err, newWallet) => {
        res.json(newWallet);
    })
}

function newExpense(req, res) {
    Wallet.findById(req.params.wallet_id, (err, foundWallet) => {
        foundWallet.expenses.push(req.body);
        foundWallet.save(function(err) {
            res.json(foundWallet)
        })
    })
}

function getWallet(req, res) {

    Wallet.findOne({'user_id': `${req.params.user_id}`, 'trip_id': `${req.params.trip_id}`}, (err, foundWallet) => {
        if (err) return handleError(err);
        res.json(foundWallet);
    })
}