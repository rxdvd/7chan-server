const express = require('express');
const router1 = express.Router();
const posts = require("../data/posts.json")

// middleware that is specific to this router
// router1.use(function timeLog (req, res, next) {
//     let today = new Date();
//     console.log(today.toISOString());
//     next();
//   })
// C R U D notation is followed

// READ all
router1.get('/', (req, res) => {
    res.json(posts)
});

// READ by pid
router1.get('/:pid', (req, res) => {
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
// CLIENT INPUT LOOKS LIKE THE FOLLOWING (can be used to try the route)
// { 
//     "title": "new post, new title",
//     "message": "new post, new message",
//     "giphy": "https://media0.giphy.com/media/enNk8yXXpDHYzD3tqF/giphy.gif?cid=5c2583098j8m18kl0gh9xq3wv558ovtq7d8ykr71wna9ycwg&rid=giphy.gif&ct=g"
// }

router1.post('/', (req, res) =>{
    try{
    let newId = posts[0].pid + 1;
    let newTitle = req.body.title;
    let newMessage = req.body.message;
    let newGiphy = req.body.giphy;
    let newTags = req.body.tags;
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
        "tags": newTags,
        "timestamp": timeNow
    }
    posts.unshift(newPost);
    console.log(typeof posts)
    //fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json(newPost); // only one res. will go through
    //res.send("comment added successfully"); // only one res. will go through
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// CREATE - add one comment 

// CLIENT INPUT LOOKS LIKE THE FOLLOWING (can be used to try the route)::
// { 
//  "comment": "another comment"
// }

// WILL NEED TO FILL IN AN ELEMEMENT THAT LOOKS LIKE THE FOLLOWING:
// "comments": [
//     {
//         "cid": 0,
//         "comment": "message",
//         "timestamp": 1285253453498
//     }
// ]

router1.post('/:pid/comments', (req, res) => {
    try {
        let newMessage = req.body.comment;
        let timeNow = Date.now();
        let requestedPostId = req.params.pid;
        let postIndex = posts.findIndex(x => x.pid == requestedPostId);
        if(postIndex === -1) { throw new Error(`Sorry we can't find a post id of ${requestedPostId}`)};
        let matchingPost = posts[postIndex];
        let newcId = 0;
        if(matchingPost.comments[0]) {newcId = matchingPost.comments[0].cid+1};
        let newComment = {"cid": newcId, "comment": newMessage, "timestamp":timeNow};
        posts[postIndex].comments.unshift(newComment);
        //fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
        res.json(posts[postIndex]); // only one res. will go through
        //res.send("comment added successfully") // only one res. will go through
      } catch (error) {
        res.status(404).json({message: error.message}); 
    }
});

// UPDATE emoji. Incoming object looks like the following {"emoji": "thumbs_down", "uid": "1234"}
router1.patch('/:pid/emoji', (req, res) => {

    let userId = req.body.uid; 
    let requestedEmoji = req.body.emoji;
    let requestedPostId = req.params.pid;

    let postIndex = posts.findIndex(x => x.pid == requestedPostId);  // find post
    let isUIDin = posts[postIndex].reactions[requestedEmoji].includes(userId);  // check if uid from request is in the array
   
    if(!isUIDin) //toggle "function"
        {posts[postIndex].reactions[requestedEmoji].unshift(userId);}
       else
        {posts[postIndex].reactions[requestedEmoji].splice(posts[postIndex].reactions[requestedEmoji].indexOf(userId), 1);} 
    //fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json(posts[postIndex]);
    
});

module.exports = router1;
