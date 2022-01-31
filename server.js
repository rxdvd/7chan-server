const express = require('express');
const app = express();
const cors = require('cors');
const { send } = require('express/lib/response');

app.use(cors());
app.use(express.json());

const posts = require("./data/posts.json")
// C R U D

app.get('/', (req, res) => {
    res.json('Testing Testing 1...2...3')
})

// READ ALL
app.get('/posts', (req, res) => {
    res.json(posts)
});

// READ by ID
app.get('/post/:pid', (req, res) => {
    try {
        let requestedPost = req.params.pid
        let matchingPost = search.find((item) => item.id === requestedPost);
        if(!matchingPost) { throw new Error(`Sorry we don't have a post id of ${requestedSearch}`)}
        res.json(matchingPost)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
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
