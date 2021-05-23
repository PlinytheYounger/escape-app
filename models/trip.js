const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema ({
    name: String,
    starting_location: String,
    ending_location: String,
    start_date: Date,
    end_date: Date,
    // accessibility_needs: Boolean,
    activity_ids: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
    // lodging_ids: [{type: Schema.Types.ObjectId, ref: 'Lodging'}],
    travel_ids: [{type: Schema.Types.ObjectId, ref: 'Travel'}],
    // photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);