const express = require('express');
const app = express();
const cors = require('cors');
const { send } = require('express/lib/response');

app.use(cors());
app.use(express.json());

const posts = require("./data/posts.json")
// C R U D

// Home page
app.get("/", (req, res) => {
    res.send('Hello code runners!');
  });  

// READ ALL
app.get('/posts', (req, res) => {
    send.json(posts)
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
