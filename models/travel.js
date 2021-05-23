const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema ({
    name: String,
    type: String,
    starting_location: String,
    ending_location: String,
    date: Date,
    reservation_number: String,

});

module.exports = mongoose.model('Travel', travelSchema);