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

    })

    // For POST for making a new comment

    // for PATCH for updating the uid in the array for reactions

    // test('responds PATCH with emojis in an array', done => {
    //     request(app)
    //         .get('/posts/:pid/emoji')
    //         .expect('content-Type', 'application/json; charset=utf-8', done)

    // })


    describe('SERVER PATCH requests', () => {

    test('to see if the patch request has went through', done =>{
        request(app)
            .patch('/posts/2/emoji')
            .send({'emoji': 'thumbs_down', 'uid': '9876'})
            .expect(200, done)
    })

    })

})
