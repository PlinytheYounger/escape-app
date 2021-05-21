const express = require("express");
const logger = require('morgan');
const path = require('path');

// const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'escape-client/build')));

// import routes
const userRouter = require('./routes/user.js');
const mainRouter = require('./routes/main.js');
// const tripRouter = require('./routes/trip.js');
// const activityRouter = require('./routes/activity.js');
// const travelRouter = require('./routes/travel.js');
// const walletRouter = require('./routes/wallet.js');
// const mapRouter = require('./routes/map.js');

// require('./config/database');
require('dotenv').config()

// app.use(require('./config/auth'));

// middleware
app.use(logger('dev'));
// app.use(cors());
app.use(express.json());

// mount routes
app.use('/', mainRouter);
app.use('/api/user', userRouter)
// app.use('/trip', tripRouter);
// app.use('/map', mapRouter);
// app.use('/activity', activityRouter);
// app.use('/travel', travelRouter);
// app.use('/wallet', walletRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/escape-client/build/index.html'));
});

const port = process.env.PORT || 3001;

app.listen(3001, function() {
    console.log(`Express is listening on port: ${port}`)
})