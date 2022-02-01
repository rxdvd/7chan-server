const { json } = require('express/lib/response');
const { TestWatcher } = require('jest');
const request = require('supertest');
const app = require('../server');

describe('posts api', () => {

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

    // For POST for making a new post

    test('to see if a post request works', done =>{
        request(app)
            .post('/posts')
            .send({
                                     "pid": 3,
                                     "title": "test text",
                                     "message": "test message",
                                     "giphy": "",
                                     "comments": [  ],
                                     "reactions": {
                                         "thumbs_up": ["1234","2345","3456"],
                                         "thumbs_down": ["1234","2345","3456","4567","3477"],
                                         "heart": []
                                     },
                                      "timestamp": Date.now
                                     })
            .expect(200, done)
    })

    // test('to test if the new post', done => {
    //     let testNewPost = {
    //                     "title": "test text",
    //                     "message": "test message",
    //                     "giphy": ""
    //                     }
                        
    //     request(app)
    //         .post('/posts')
    //         .send(testNewPost)
    //         .expect({                        
    //             "pid": 4,
    //             "title": "test text",
    //             "message": "test message",
    //             "giphy": "",
    //             "comments": [],
    //             "reactions": {
    //                 "thumbs_up": [],
    //                 "thumbs_down": [],
    //                 "heart": []
    //         },
    //          "timestamp": Date.now()}, done)

    // })


    // For POST for making a new comment

    




    // for PATCH for updating the uid in the array for reactions

    // test('responds PATCH with emojis in an array', done => {
    //     request(app)
    //         .get('/posts/:pid/emoji')
    //         .expect('content-Type', 'application/json; charset=utf-8', done)

    // })

    test('to see if the patch request has went through', done =>{
        request(app)
            .patch('/posts/2/emoji')
            .send({'emoji': 'thumbs_down', 'uid': '9876'})
            .expect(200, done)

    test

    })

});
