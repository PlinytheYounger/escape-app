const mongoose = require('mongoose');
require('dotenv').config();
const DATABASE = process.env.DATABASE_URL;

mongoose.connect(DATABASE, {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useUnifiedTopology: true 
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});