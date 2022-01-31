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

// CREATE - one post -will need to add item persistently
// CLIENT INPUT LOOKS LIKE:
// { 
//     "title": "new post, new title",
//     "message": "new post, new message",
//     "giphy": "https://media0.giphy.com/media/enNk8yXXpDHYzD3tqF/giphy.gif?cid=5c2583098j8m18kl0gh9xq3wv558ovtq7d8ykr71wna9ycwg&rid=giphy.gif&ct=g",
// }

app.post('/posts', (req, res) =>{
    try{
    let newId = posts[0].pid + 1;
    let newTitle = req.body.title;
    let newMessage = req.body.message;
    let newGiphy = req.body.giphy;
    let timeNow = Date.now();

    let newPost = {
        "pid": newId,
        "title": newTitle,
        "message": newMessage,
        "giphy": newGiphy,
        "comments": [],
        "reactions": {
            "thumbs_up": [],
            "thumbs_down": [],
            "heart": []
        },
        "time": timeNow
    }
    if(!newTitle) { throw new Error(`No title entered.`)};
    if(!newTitle) { throw new Error(`No text entered.`)};
    posts.unshift(newPost);
    res.json(newPost); // only one res. will go through
    //res.send("comment added successfully"); // only one res. will go through
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// CREATE - add one comment 

// CLIENT INPUT LOOKS LIKE:
// { 
//     "cid": 2,
//     "comment": "another comment"
// }

// WILL NEED TO FILL IN AN ELEMEMENT that look like:
// "comments": [
//     {
//         "cid": 3,
//         "message": "message",
//         "time": 1285253453498
//     }
// ]

app.post('/posts/:id/comments', (req, res) => {
    try {
        let newMessage = req.body.message;
        console.log(posts);
        console.log(newMessage);
        let timeNow = Date.now();
        let requestedPostId = req.body.pid;
        console.log(requestedPostId);
        let postIndex = posts.findIndex(x => x.pid == requestedPostId);
        console.log(postIndex);
        if(postIndex === -1) { throw new Error(`Sorry we can't find a post id of ${requestedPostId}`)};
        let matchingPost = posts[postIndex];
        let newcId = matchingPost.comments[0].cid + 1 || 0;
        console.log(newcId);
        console.log(posts[postIndex].comments);
        let newComment = {"cid": newcId, "message": newMessage, "time":timeNow};
        console.log(newComment);
        posts[postIndex].comments.unshift(newComment);
        res.json(posts[postIndex]); // only one res. will go through
        //res.send("comment added successfully") // only one res. will go through
      } catch (error) {
        res.status(404).json({message: error.message}); 
    }
});

// CREATE emoji
app.post('/posts/:pid/emoji', (req, res) => {
    
});

module.exports = app;
