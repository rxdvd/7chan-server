const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const postsRoutes = require('./routes/postsRoutes'); // user specific routes
app.use('/posts', postsRoutes); // add user routes when the "/post" route is requested

// Welcome message
app.get('/', (req, res) => {
    res.json('Welcome to all code runners!');
});


module.exports = app;
