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
// CLIENT INPUT LOOKS LIKE this:
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
    if(!newTitle) { throw new Error(`No title entered.`)};
    if(!newMessage) { throw new Error(`No text entered.`)};
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
//  "comment": "another comment"
// }

// WILL NEED TO FILL IN AN ELEMEMENT that look like:
// "comments": [
//     {
//         "cid": 3,
//         "comment": "message",
//         "time": 1285253453498
//     }
// ]

app.post('/posts/:pid/comments', (req, res) => {
    try {
        let newMessage = req.body.comment;
        console.log(posts);
        console.log(newMessage);
        let timeNow = Date.now();
        let requestedPostId = req.params.pid;
        console.log(requestedPostId);
        let postIndex = posts.findIndex(x => x.pid == requestedPostId);
        console.log(postIndex);
        if(postIndex === -1) { throw new Error(`Sorry we can't find a post id of ${requestedPostId}`)};
        let matchingPost = posts[postIndex];
        let newcId = 0;
        if(matchingPost.comments[0]) {newcId = matchingPost.comments[0].cid+1};
        console.log(newcId);
        console.log(posts[postIndex].comments);
        let newComment = {"cid": newcId, "comment": newMessage, "time":timeNow};
        console.log(newComment);
        posts[postIndex].comments.unshift(newComment);
        res.json(posts[postIndex]); // only one res. will go through
        //res.send("comment added successfully") // only one res. will go through
      } catch (error) {
        res.status(404).json({message: error.message}); 
    }
});

// CREATE emoji {"pid": pid, "emoji": "thumbs_up", "uid": "123456",}
app.patch('/posts/:pid/emoji', (req, res) => {
    // check if uid from request is in the array
    // remove it if in array
    // push it if not in array
    let emojiCount = posts[req.params.pid].reactions["thumbs_up"].length;


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
