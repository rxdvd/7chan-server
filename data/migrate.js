const fs = require("fs");

const POSTS = require("./_posts.json");

let posts = [];
let comments = [];
let emojis = [];
let reactions = [];

for(let i = 0; i < POSTS.length; i++){
    let post = POSTS[i];
    post.pid = posts.length + 1;
    posts.push({
        pid: post.pid,
        title: post.title,
        message: post.message,
        giphy: post.giphy,
        tags: post.tags.join(", "),
        timestamp: post.timestamp
    });
    post.comments.forEach(comment => {
        comments.push({
            cid: comments.length + 1,
            comment: comment.comment,
            timestamp: comment.timestamp,
            pid: post.pid
        });
    });
    for(let reaction in post.reactions) {
        if(!emojis.find(emoji => emoji.name === reaction)) {
            emojis.push({
                eid: emojis.length + 1,
                name: reaction
            });
        }
        post.reactions[reaction].forEach(uid => {
            reactions.push({
                rid: reactions.length + 1,
                eid: emojis.find(emoji => emoji.name === reaction).eid,
                pid: post.pid,
                uid: uid
            });
        });
    }
}

fs.writeFileSync(require.resolve("./posts.json"), JSON.stringify(posts), "utf8");
fs.writeFileSync(require.resolve("./comments.json"), JSON.stringify(comments), "utf8");
fs.writeFileSync(require.resolve("./emojis.json"), JSON.stringify(emojis), "utf8");
fs.writeFileSync(require.resolve("./reactions.json"), JSON.stringify(reactions), "utf8");
