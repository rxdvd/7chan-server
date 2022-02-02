const express = require('express');
const router2 = express.Router();
const posts = require("../data/posts.json")

// middleware that is specific to this router
// router1.use(function timeLog (req, res, next) {
//     let today = new Date();
//     console.log(today.toISOString());
//     next();
//   })
// C R U D notation is followed

// READ all
router2.get('/', (req, res) => {
    res.json(posts)
});

// READ by pid
router2.get('/:pid', (req, res) => {
    try {
        let requestedPostId = req.params.pid;
        let matchingPost = posts.find( ({pid}) => pid == requestedPostId);
        if(!matchingPost) { throw new Error(`Sorry we don't have a post id of ${requestedPostId}`)}
        res.json(matchingPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
});
