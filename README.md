# 7chan-server

<!-- badges -->
[![ISC license](https://img.shields.io/badge/License-ISC-blue.svg)](https://www.isc.org/licenses/)
[![GitHub latest commit](https://img.shields.io/github/last-commit/rxdvd/7chan-server.svg)](https://GitHub.com/rxdvd/7chan-server/commit/)
[![GitHub forks](https://img.shields.io/github/forks/rxdvd/7chan-server.svg)](https://GitHub.com/rxdvd/7chan-server)

API server for group project working on an anonymous community journaling website.

## Installation & Usage

1. Clone this repo using `git clone`
2. Enter the directory `cd 7chan-server`
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
| `GET /post/:pid` | Return a JSON object with data for a specific post |
| `POST /posts` | Create a new post data entry |
| `POST /post/:pid/emoji` | Add or remove an emoji reaction from a post |
| `POST /post/:pid/comment/:cid/emoji` | Add or remove an emoji reaction from a comment |

### Object Structure

```json
{ // for each journal post
    "id": 0,
    "title": "title",
    "message": "message",
    "giphy": "giphy_url",
    "comments": [
        {
            "id": 0,
            "message": "message",
            "giphy": "giphy_url",
            "time": 0
        }
    ],
    "reactions": {
        // each array contains identifiers for the users who have reacted
        // this allows the client to track whether a user has reacted using cookies
        "thumbs_up": [],
        "thumbs_down": [],
        "heart": []
    },
    "time": 0
}
```

## Changelog



## Fixed Bugs



## Pitfalls & Discoveries

<!-- things you didn't know how to do, how you solved it i.e. any time you had to google -->

## Remaining Bugs



## Improvements & Future Features



## License

[ISC License 🔗](https://www.isc.org/licenses/)
