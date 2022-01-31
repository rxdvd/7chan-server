const express = require('express');
const app = express();
const cors = require('cors');
const { send } = require('express/lib/response');

app.use(cors());
app.use(express.json());

const posts = require("./data/posts.json")
// C R U D

// Welcome message
app.get('/', (req, res) => {
    res.json('Welcome to all code runners!')
})

// READ all
app.get('/posts', (req, res) => {
    res.json(posts)
});

// READ by pid
app.get('/posts/:pid', (req, res) => {
    try {
        let requestedPostId = req.params.pid;
        let matchingPost = posts.find( ({pid}) => pid == requestedPostId);
        if(!matchingPost) { throw new Error(`Sorry we don't have a post id of ${requestedPostId}`)}
        res.json(matchingPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// CREATE - one post -need to add item persistently
app.post('/posts', (req, res) =>{
    console.log("hello");
    try{
    let newPost = req.body;
    console.log(posts);
    if(!newPost) { throw new Error(`No comment entered`)}
    posts.unshift(newPost);
    console.log(posts);
    res.json(posts[0]);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// CREATE - one comment / UPDATE the post with one comment
app.post('/posts', (req, res) => {

});

// CREATE emoji
app.post('/posts/:pid/emoji', (req, res) => {
    
});

module.exports = app;
