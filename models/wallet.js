const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const expenseSchema = new Schema ({
    name: String,
    date: Date,
    amount: Number
})

const walletSchema = new Schema ({
    budget: Number,
    trip_id: {type: Schema.Types.ObjectId, ref: 'Trip'},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    expenses: [expenseSchema]
})

module.exports = mongoose.model('Wallet', walletSchema);