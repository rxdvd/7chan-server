const request = require('supertest');
const app = require('../server');
const testObject = require('../data/posts');

describe('SERVER requests', () => {

    describe('SERVER GET requests', () => {

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

        test('to see if a get request correctly recieves all posts', done => {
            console.log(testObject);
            request(app)
                .get('/posts')
                .expect(testObject)
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

        
        let testId2Post = testObject[0]

        test ('to see if a get request correctly recieves post of id=2', done => {
            request(app)
                .get('/posts/2')
                .expect(testId2Post)
                .end(done)
        })

        })

    
    describe('SERVER POST requests', () => {
 
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
