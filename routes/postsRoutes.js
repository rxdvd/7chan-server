const express = require('express');
const router = express.Router();
const posts = require("../data/posts.json");

// GET /posts
router.get('/', (req, res) => {
    res.json(posts);
});

// GET /posts/:pid
router.get('/:pid', (req, res) => {
    try {
        let matchingPost = posts.find(pid => pid == req.params.pid);
        if(!matchingPost) {
            throw new Error(`Sorry we don't have a post id of ${requestedPostId}`);
        }
        res.json(matchingPost);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
    
});

// POST /posts
router.post('/', (req, res) =>{
    try{
        let maxId = Math.max(...posts.map(post => post.pid));
        let newId = posts.length ? maxId + 1 : 0;
        let newPost = {
            "pid": newId,
            "title": req.body.title,
            "message": req.body.message,
            "giphy": req.body.giphy,
            "comments": [],
            "reactions": {
                "thumbs_up": [],
                "thumbs_down": [],
                "heart": []
            },
            "tags": req.body.tags,
            "timestamp": Date.now()
        };
        if(!newPost.title) throw new Error(`No title entered.`);
        if(!newPost.message) throw new Error(`No text entered.`);
        posts.unshift(newPost);
        res.json(newPost);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// POST /posts/:pid/comments
router.post('/:pid/comments', (req, res) => {
    try {
        let matchingPost = posts.find(post => post.pid == req.params.pid);
        if(!matchingPost) throw new Error(`Sorry we can't find a post id of ${req.params.pid}`);
        let maxCid = Math.max(...matchingPost.comments.map(comment => comment.cid));
        let newCid = matchingPost.comments.length ? maxCid + 1 : 0;
        let newComment = {
            "cid": newCid, 
            "comment": req.body.comment, 
            "timestamp": Date.now()
        };
        matchingPost.comments.unshift(newComment);
        res.json(matchingPost); 
      } catch (error) {
        res.status(404).json({message: error.message}); 
    }
});

// PATCH /posts/:pid/emoji
router.patch('/:pid/emoji', (req, res) => {
    try {
        let matchingPost = posts.find(post => post.pid == req.params.pid);
        if(!matchingPost) throw new Error(`Sorry we can't find a post id of ${req.params.pid}`);

        let reactionArray = matchingPost.reactions[req.body.emoji];
        let uidIndex = reactionArray.indexOf(req.body.uid);

        //toggle "function"
        if(uidIndex < 0) {
            reactionArray.unshift(req.body.uid);
        } else {
            reactionArray.splice(uidIndex, 1);
        }

        res.json(matchingPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;
