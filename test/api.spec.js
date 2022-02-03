const req = require('express/lib/request');
const request = require('supertest');
const app = require('../server');

describe('SERVER requests', () => {

    describe('SERVER GET requests', () => {

    // For GET requests
    test('responds GET/ with Welcome to all code runners!', done => {
        request(app)
            .get('/')
            .expect(200, done)
    })
    test('responds GET/posts with all the posts correct', done => {
        request(app)
            .get('/posts')
            .expect(200, done)
    })

    test('responds GET/posts  with all the post in a JSON file', done => {
        request(app)
            .get('/posts/')
            .expect('content-Type', 'application/json; charset=utf-8', done)

    })

    let testAllPost = [   {
        "pid": 2,
        "title": "codind a chess board",
        "message": "its hard, mate",
        "giphy": "https://media0.giphy.com/media/enNk8yXXpDHYzD3tqF/giphy.gif?cid=5c2583098j8m18kl0gh9xq3wv558ovtq7d8ykr71wna9ycwg&rid=giphy.gif&ct=g",
        "comments": [
            
        ],
        "reactions": {
            "thumbs_up": ["1234","2345","3456"],
            "thumbs_down": ["1234","3457","9876"],
            "heart": []
        },
        "tags": [
            "javascript", "python", "html"
        ],
        "timestamp": 0
        },
        {
        "pid": 1,
        "title": "making changes persistent",
        "message": "use fs mate, that works",
        "giphy": "https://media4.giphy.com/media/WWnRkIRgZKm8o/giphy.gif?cid=e826c9fc5cad77cad0dd5681f2775f0492a9f279c308cd1e&rid=giphy.gif&ct=g",
        "comments": [
            {
                "cid": 0,
                "comment": "i can't agree more",
                "timestamp": 0
            }
        ],
        "reactions": {
            "thumbs_up": ["1111","1112","1113","1114","1211","1212","1213","1214","1311","1312","1313","1314","1411","1412","1413","1414","1511","1512"],
            "thumbs_down": [],
            "heart": []
        },
        "tags": [
            "javascript", "python", "html"
        ],
        "timestamp": 0
        },
        {
        "pid": 0,
        "title": "need help with python",
        "message": "trying to code a missile but it doesn't launch",
        "giphy": "giphy_url",
        "comments": [
            {
                "cid": 0,
                "comment": "ask Elon Musk",
                "timestamp": 0
            }
        ],
        "reactions": {
            "thumbs_up": [],
            "thumbs_down": [],
            "heart": ["5351","3634"]
        },
        "tags": [
            "javascript", "python", "html"
        ],
        "timestamp": 0
        }
    ]
    

    test('to see if a get request correctly recieves all posts', done => {
        request(app)
            .get('/posts')
            .expect(testAllPost)
            .end(done)
    })

    test('responds GET/posts/:pid with with a a id=1 correct', done => {
        request(app)
            .get('/posts')
            .expect(200, done)
    })

    test('responds GET/posts/:pid with with a JSON file', done => {
        request(app)
            .get('/posts/1')
            .expect('content-Type', 'application/json; charset=utf-8', done)
    })

    let testId2Post = {
        "pid": 2,
        "title": "codind a chess board",
        "message": "its hard, mate",
        "giphy": "https://media0.giphy.com/media/enNk8yXXpDHYzD3tqF/giphy.gif?cid=5c2583098j8m18kl0gh9xq3wv558ovtq7d8ykr71wna9ycwg&rid=giphy.gif&ct=g",
        "comments": [
            
        ],
        "reactions": {
            "thumbs_up": ["1234","2345","3456"],
            "thumbs_down": ["1234","3457","9876"],
            "heart": []
        },
        "tags": [
            "javascript", "python", "html"
        ],
        "timestamp": 0
        }

    test ('to see if a get request correctly recieves post of id=2', done => {
        request(app)
            .get('/posts/2')
            .expect(testId2Post)
            .end(done)
    })

    })

    
    describe('SERVER POST requests', () => {
 
    // For POST for making a new post
    test('to see if a post request works', done =>{
        request(app)
            .post('/posts')        
            .send({
            "title": "test text",
            "message": "test message",
            "giphy": "",
            })
            .expect(200, done)
    })

    let testNewPost = {
        "title": "test text",
        "message": "test message",
        "giphy": ""
    }
 
    function hasCorrectResponse (res) {
        if (!(res.body.title === "test text" )){throw new Error("incorrect title")};
        if (!(res.body.message === "test message" )){throw new Error("incorrect message")};
        if (!(res.body.giphy === "" )){throw new Error("incorrect giphy")};
        if (!(typeof res.body.comments === 'object' )){throw new Error("incorrect comments field")};
        if (!(typeof res.body.reactions === 'object')){throw new Error("incorrect reactions field")};
        if (!(res.body.timestamp != undefined )){throw new Error("time stamp undefined")};
    }

    test('to test if a new post is generated correctly', ( done ) => {                    
        request(app)
            .post('/posts')
            .send(testNewPost)
            .expect(hasCorrectResponse)
            .end(done)
    })

        // For POST for making a new comment

        timestamp = Date.now();

        test('to see if we get a post request for comments working', done =>{
            request(app)
                .post('/posts/2/comments')
                .send({"cid": "6969", "comment": "test message"})
                .expect(200, done)
        })

        test('to see if we get the post as a text file', done =>{
            request(app)
                .get('/2/comments')
                .expect('content-Type', 'text/html; charset=utf-8', done)
        })

        testNewComment = {
             "comment": "test message"
            }

            function hasCorrectCommentResponse (res) {
                if (!(res.body.comments[0].comment === "test message" )){throw new Error("incorrect comment returned")};

            }

        test('to see if new comment is generated correctly', done =>{
            request(app)
                .post('/posts/2/comments')
                .send(testNewComment)
                .expect(hasCorrectCommentResponse)
                .end(done)
        })

    })



    // for PATCH for updating the uid in the array for reactions




    describe('SERVER PATCH requests', () => {

    test('to see if the patch request has went through', done =>{
        request(app)
            .patch('/posts/2/emoji')
            .send({'emoji': 'thumbs_down', 'uid': '9876'})
            .expect(200, done)
    })

    test('responds PATCH to makesure emojis returns a text in an array', done => {
        request(app)
            .get('/posts/1/emoji')
            .expect('content-Type', 'text/html; charset=utf-8', done)
    })
    

    let testNewEmoji = {
        'emoji': 'thumbs_down',
         'uid': '8765'
        }
   

    function hasCorrectEmojiResponse (res) {
            console.log(res.body)
         if (!(res.body.reactions.thumbs_down[0] === "8765")){throw new Error("incorrect thumbs_down uid")};
    }

    test('responds PATCH updating uid in an array', done =>{
        request(app)
            .patch('/posts/1/emoji')
            .send(testNewEmoji)
            .expect(hasCorrectEmojiResponse)
            .end(done)
    })
        
    })

})
