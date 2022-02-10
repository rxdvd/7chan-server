const express = require('express');
const router = express.Router();
const Post = require("../models/post");

// GET /posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.all;
        res.json(posts);
    }catch(err){
        res.status(404).json({
            message: err.message
        });
    }
});

// GET /posts/:pid
router.get('/:pid', async (req, res) => {
    try {
        const post = await Post.byID(req.params.pid);
        res.json(post);
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});

// POST /posts
router.post('/', async (req, res) =>{
    try{
        const post = await Post.newPost(
            req.body.title,
            req.body.message,
            req.body.giphy,
            req.body.tags
        );
        res.json(post);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST /posts/:pid/comments
router.post('/:pid/comments', async (req, res) => {
    try {
        let post = await Post.byID(req.params.pid);
        await post.newComment(req.body.comment);
        res.json(post);
      } catch (err) {
        res.status(404).json({
            message: err.message
        }); 
    }
});

// PATCH /posts/:pid/emoji
router.patch('/:pid/emoji', async (req, res) => {
    try {
        let post = await Post.byID(req.params.pid);
        await post.toggleReaction(
            req.body.emoji, 
            req.body.uid
        );
        res.json(post);
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});

module.exports = router;
