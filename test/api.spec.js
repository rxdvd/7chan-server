const request = require('supertest');
const app = require('../server');
const testObject = require('../data/posts');

describe('Server requests', () => {

    describe('GET requests', () => {

        test('responds with status code 200 to a GET/ request', done => {
            request(app)
                .get('/')
                .expect(200, done)
        })
        test('responds with status code 200 to a GET/posts request', done => {
            request(app)
                .get('/posts')
                .expect(200, done)
        })

        test('responds with correct content type to a GET/posts request', done => {
            request(app)
                .get('/posts/')
                .expect('content-Type', 'application/json; charset=utf-8', done)

        })

        test('responds with all posts to a GET/posts request', done => {
            console.log(testObject);
            request(app)
                .get('/posts')
                .expect(testObject)
                .end(done)
        })

        test('responds with correct content format to GET/posts/:pid request', done => {
            request(app)
                .get('/posts/1')
                .expect('content-Type', 'application/json; charset=utf-8', done)
        })

        test('throws an error for GET/posts/:pid if a post id of pid is not stored', done => {
            request(app)
                .get('/posts/123762372364')
                .expect(404, done)
        })

        })

    describe('POST requests', () => {

        let testNewPost = {
            "title": "test text",
            "message": "test message",
            "giphy": "www"
        }
 
        test('responds with status code 200 to a correct post request', done =>{
            request(app)
                .post('/posts')        
                .send(testNewPost)
                .expect(200, done)
        })

                function hasCorrectResponse (res) {
            if (!(res.body.title === "test text" )){throw new Error("incorrect title")};
            if (!(res.body.message === "test message" )){throw new Error("incorrect message")};
            if (!(res.body.giphy === "www" )){throw new Error("incorrect giphy")};
            if (!(typeof res.body.comments === 'object' )){throw new Error("incorrect comments field")};
            if (!(typeof res.body.reactions === 'object')){throw new Error("incorrect reactions field")};
            if (!(res.body.timestamp != undefined )){throw new Error("time stamp undefined")};
        }

        test('create correct object when sending a request to create a new post', ( done ) => {                    
            request(app)
                .post('/posts')
                .send(testNewPost)
                .expect(hasCorrectResponse)
                .end(done)
        })

        let testNewPostWithoutTitle = {
            "title": "",
            "message": "test message",
            "giphy": ""
        }

        test('throws an error when trying to generate a post without title', ( done ) => {                    
            request(app)
                .post('/posts')
                .send(testNewPostWithoutTitle)
                .expect(400)
                .end(done)
            })

        let testNewPostWithoutMessage = {
            "title": "here a title",
            "message": "",
            "giphy": ""
        }
    
        test('throws an error when trying to generate a post without message', ( done ) => {                    
            request(app)
                .post('/posts')
                .send(testNewPostWithoutMessage)
                .expect(400)
                .end(done)
            })

        test('responds with status code 200 to a request to add a new comment to an existing post', done =>{
            request(app)
                .post('/posts/2/comments')
                .send({"cid": "6969", "comment": "test message"})
                .expect(200, done)
        })

        testNewComment = {
        "comment": "test message"
        }

        function hasCorrectCommentResponse (res) {
            if (!(res.body.comments[0].comment === "test message" )){throw new Error("incorrect comment returned")};
        }

        test('create correct message in the comments object', done =>{
            request(app)
                .post('/posts/2/comments')
                .send(testNewComment)
                .expect(hasCorrectCommentResponse)
                .end(done)
        })

    })

    test('throw an error for GET/posts/:pid/comments if a post id of pid is not stored ', done => {
        request(app)
            .post('/posts/1237623/comments')
            .expect(404, done)
    })

    describe('PATCH requests', () => {

        test('responds with status code 200 to a correct patch request for emojis', done =>{
            request(app)
                .patch('/posts/2/emoji')
                .send({'emoji': 'thumbs_down', 'uid': '9876'})
                .expect(200, done)
        })

            let testNewEmoji = {
                'emoji': 'thumbs_down',
                'uid': '8765123'
                }
        

            function hasCorrectEmojiResponse (res) {
                    console.log(res.body)
                if (!(res.body.reactions.thumbs_down[0] === "8765123")){throw new Error("incorrect thumbs_down uid")};
            }

        test('updates emoji count correctly', done =>{
            request(app)
                .patch('/posts/1/emoji')
                .send(testNewEmoji)
                .expect(hasCorrectEmojiResponse)
                .end(done)
        })
        
    })

})
