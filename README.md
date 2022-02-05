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

This server is currently deployed at https://coderunner-blog.herokuapp.com/

## Project Goal

Build a website where users can anonymously post journal entries for other people to see, comment on and react to using emojis.

### Other Requirements:

* Message character limit
* Add gifs to messages using giphy

## Design & Implementation

To create this API we decided to use the popular routing framework express to implement our routes. Emoji reactions for posts use cookies to keep track of who has reacted in order to offer users the option of removing their own reactions.

<!-- maybe put image of api working here, like the gifs from our debug assignment -->

### Technologies

* [node.js 🔗](https://nodejs.org/) 
* [express 🔗](https://expressjs.com/)
* [Jest 🔗](https://jestjs.io/)

### Routes

| Route | Action |
| - | - |
| `GET /posts` | Return a JSON object of all post data |
| `GET /posts/:pid` | Return a JSON object with data for a specific post |
| `POST /posts` | Create a new post data entry |
| `POST /posts/:pid/comments` | Create a new comment data entry for a specific post |
| `PATCH /posts/:pid/emoji` | Add or remove an emoji reaction from a specific post |

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
    "tags": [],
    "timestamp": 0
}
```

#### `POST /posts` request body

```json
{
    "title": "title",
    "message": "message",
    "giphy": "giphy_url",
    "tags": [
        "tag1", "tag2", "tag3"
    ]
}
```

#### `PATCH /posts/:pid/emoji` request body

```json
{
    "emoji": "thumbs_up",
    "uid": "3253463463" // localStorage item so that users can add/remove reactions
}
```
#### `POST /posts/:pid/comments` request body

```json
{
    "comment": "message"
}
```

## Changelog

* `/posts` routes factored into separate file.
* Tags can be added to posts.

## Fixed Bugs

+ throw an error if a comment is submitted with no title
+ throw an error if a comment is submitted with no message

- [x] Empty posts are accepted into the data.

## Pitfalls & Discoveries

* Posts matching certain criteria could easily be found within the data array using the [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method.

+ jest coverage does not count in html files

## Remaining Bugs

- [ ] Blank comments are accepted into the data.

## Improvements & Future Features

+ We have trialled but not included a server route that requires authentication in order to delete a post 


* Post moderation by adding a password protected delete route into the API.
* Nicknames to be added to posts alongside the title and message.

## License

[ISC License 🔗](https://www.isc.org/licenses/)
