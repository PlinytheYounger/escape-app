const mongoose = require('mongoose');
require('dotenv').config();
const DATABASE = process.env.DATABASE_URL;

mongoose.connect(DATABASE, {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useUnifiedTopology: true 
});

// mongoose 
//  .connect(process.env.DATABASE, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,   })   
//  .then(() => console.log("Database connected!"))
//  .catch(err => console.log(err));

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
