const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const router1 = require('./routes/userRoutes'); // user specific routes
app.use('/posts', router1); // add user routes when the "/post" route is requested

const router1 = require('./routes/adminRoutes'); // user specific routes
app.use('/admin', router2); // add user routes when the "/post" route is requested

// Welcome message
app.get('/', (req, res) => {
    res.json('Welcome to all code runners!')
})


module.exports = app;
