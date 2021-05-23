const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    name: String,
    link: String,
    type: String,
    location: String,
    date: Date,
});

module.exports = mongoose.model('Activity', activitySchema);