const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// C R U D

// READ ALL
app.get('/posts', (req, res) => {
    
});

// READ by ID
app.get('/post/:pid', (req, res) => {

});

// CREATE - one post
app.post('/posts', (req, res) => {

});

// CREATE - one comment / UPDATE the post with one comment
app.post('/posts', (req, res) => {

});

// CREATE emoji
app.post('/post/:pid/emoji', (req, res) => {

});

module.exports = app;
