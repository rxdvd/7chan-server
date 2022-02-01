# coderunner-server

<!-- badges -->
[![ISC license](https://img.shields.io/badge/License-ISC-blue.svg)](https://www.isc.org/licenses/)
[![GitHub latest commit](https://img.shields.io/github/last-commit/rxdvd/coderunner-server.svg)](https://GitHub.com/rxdvd/coderunner-server/commit/)
[![GitHub forks](https://img.shields.io/github/forks/rxdvd/coderunner-server.svg)](https://GitHub.com/rxdvd/coderunner-server)

API server for group project working on an anonymous community journaling website.

## Installation & Usage

1. Clone this repo using `git clone`
2. Enter the directory `cd coderunner-server`
3. Install dependencies `npm install`
   
* `npm start` to run the server.
* `npm test` to run tests contained in `test/` directory
* `npm run coverage` to check test coverage
* `npm run dev` to run the server with `nodemon`

### Deployment

This server is currently deployed at https://safe-coast-17152.herokuapp.com/

## Project Goal

Build a website where users can anonymously post journal entries for other people to see, comment on and react to using emojis.

### Other Requirements:

* Message character limit
* Add gifs to messages using giphy

## Design & Implementation

To create this API we decided to use the popular routing framework express to implement our routes. Emoji reactions for posts and comments use cookies to keep track of who has reacted.

<!-- maybe put image of api working here, like the gifs from our debug assignment -->

### Technologies

* [node.js 🔗](https://nodejs.org/) 
* [express 🔗](https://expressjs.com/)

### Routes

| Route | Action |
| - | - |
| `GET /posts` | Return a JSON object of all post data |
| `GET /posts/:pid` | Return a JSON object with data for a specific post |
| `POST /posts` | Create a new post data entry |
| `POST /posts/:pid/comments` | Create a new comment data entry |
| `POST /posts/:pid/emoji` | Add or remove an emoji reaction from a post |

### Object Structure

```json
{ // for each journal post
    "pid": 0,
    "title": "title",
    "message": "message",
    "giphy": "giphy_url",
    "comments": [
        {
            "cid": 0,
            "comment": "message",
            "timestamp": 0
        }
    ],
    "reactions": {
        // each array contains identifiers for the users who have reacted
        // this allows the client to track whether a user has reacted using cookies
        "thumbs_up": [],
        "thumbs_down": [],
        "heart": []
    },
    "timestamp": 0
}
```

### Obj structure to Create Post from User Input

```json
{ // for each journal post
    "title": "title",
    "message": "message",
    "giphy": "giphy_url",
}
```


## Changelog

+ Renamed `id` tp `pid` for post id and `cid` for comment id 

## Fixed Bugs



## Pitfalls & Discoveries

<!-- things you didn't know how to do, how you solved it i.e. any time you had to google -->
+ Using a destructuring tecnique to find an object by "inner id": `posts.find( ({pid}) => pid == requestedPostId)` https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

## Remaining Bugs

+ throw an error if a comment is submitted blank

## Improvements & Future Features



## License

[ISC License 🔗](https://www.isc.org/licenses/)
