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

    test('to see if it responds correctly and with a JSON file', done => {
        request(app)
            .get('/posts')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done)
    })

    // test('to test if the new post', done => {
    //     let testNewPost = {
    //                     "pid": 3,
    //                     "title": "test text",
    //                     "message": "test message",
    //                     "giphy": "",
    //                     "comments": [  ],
    //                     "reactions": {
    //                         "thumbs_up": ["1234","2345","3456"],
    //                         "thumbs_down": ["1234","2345","3456","4567","3477"],
    //                         "heart": []
    //                     },
    //                      "timestamp": Date.now
    //                     }
                        
    //     request(app)
    //         .post('/posts')
    //         .send(testNewPost)
    //         .expect(201, {                        
    //             "pid": 3,
    //             "title": "test text",
    //             "message": "test message",
    //             "giphy": "",
    //             "comments": [  ],
    //             "reactions": {
    //                 "thumbs_up": ["1234","2345","3456"],
    //                 "thumbs_down": ["1234","2345","3456","4567","3477"],
    //                 "heart": []
    //         },
    //          "timestamp": Date.now}, done)

    // })


    // For POST for making a new comment

    




    // for PATCH for updating the uid in the array for reactions

    test('responds PATCH with emojis in an array', done => {
        request(app)
            .get('/posts/:pid/emoji')
            .expect('content-Type', 'application/json; charset=utf-8', done)

    })

    // test('to see if a new uid is added to the end', done>{
    //     request(app)
    //         .patch('/posts/:pid/emoji')
    //         .send('9876')
    //         .expect(200,         {"reactions": {
    //             "thumbs_up": ["1234","2345","3456"],
    //             "thumbs_down": ["1234","2345","3456","4567","3477"],
    //             "heart": []}, 
    //             done)

    // })

});
