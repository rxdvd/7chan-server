const express = require('express');
const app = express();
const cors = require('cors');
const { send } = require('express/lib/response');

app.use(cors());
app.use(express.json());

const posts = require("./data/posts.json");
const { restart } = require('nodemon');
// C R U D

// Welcome message
app.get('/', (req, res) => {
    res.json('Welcome to all code runners!')
})

// READ all
app.get('/posts', (req, res) => {
    res.json(posts)
    res.send(console.log("You can now see all of the posts"))
});

// READ by pid
app.get('/posts/:pid', (req, res) => {
    try {
        let requestedPostId = req.params.pid;
        let matchingPost = posts.find( ({pid}) => pid == requestedPostId);
        if(!matchingPost) { throw new Error(`Sorry we don't have a post id of ${requestedPostId}`)}
        res.json(matchingPost);
        res.send(console.log(`You can now see the post ${pid}`))
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
app.patch('/posts/:pid/emoji', (req, res) => {
    // check if uid from request is in the array
    // remove it if in array
    // push it if not in array

    let emojiCount = req.body;

    let emojiCountThumbsUp = posts[req.params.pid].reactions["thumbs_up"].length;
    function checkEmojiCountThumbsUp(uid, thumbsUpArr) {

        // let uid = insertuidherefromclientside;
        // let thumbsUpArr = addpathtoThumbsup;

        for(let i=0; thumbsUpArr.length; i++){
            if(thumbsUpArr[i] === uid){
                return thumbsUpArr.splice(uid)
            } else if( thumbsUpArr.includes(uid) === false) {
                return thumbsUpArr.push(uid)
            } else {

            }
            res.json(posts.reactions[thumbs_up]);
            res.send(console.log("The value of the thumbs up emoji has changed"));
        }

    }

    // let emojiCountThumbsDown = req.params.reactions.thumbs_down;
    // function checkEmojiCountThumbsDown(uid, thumbsDowbArr) {

    //     let uid = insertuidherefromclientside;
    //     let thumbsDownArr = addpathtoThumbsdown;

    //     for(let i=0; thumbsDowbArr.length; i++){
    //         if(thumbsDownArr[i] === uid){
    //             return thumbsDownArr.splice(uid)
    //         } else if( thumbsDownArr.includes(uid) === false) {
    //             return thumbsDownArr.push(uid)
    //         } else {

    //         }
    //     }

    // }

    // let emojiCountHeart = req.params.reactions.heart;
    // function checkEmojiCountHeart(uid, thumbsHeartArr) {

    //     let uid = insertuidherefromclientside;
    //     let HeartArr = addpathtoHeart;

    //     for(let i=0; heartArr.length; i++){
    //         if(heartArr[i] === uid){
    //             return heartArr.splice(uid)
    //         } else if( heartArr.includes(uid) === false) {
    //             return heartArr.push(uid)
    //         } else {

    //         }
    //     }

    // }

});

module.exports = app;
