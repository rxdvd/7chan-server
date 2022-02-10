const postData = require("../data/posts.json");

class Post {
    constructor(data){
        for(let key in data){
            this[key] = data[key];
        }
    }

    static get all() {
        return new Promise((resolve, reject) => {
            try {
                const posts = postData.map(post => new Post(post));
                resolve(posts);
            } catch(err) {
                reject(err);
            }
        });
    }

    static byID(pid) {
        return new Promise((resolve, reject) => {
            try {
                if(!pid) throw new Error("No post id specified.");
                let matchingPost = postData.find(post => post.pid == pid);
                if(!matchingPost) throw new Error("Post not found.");
                resolve(new Post(matchingPost));
            } catch(err) {
                reject(err);
            }
        });
    }

    static newPost(title, message, giphy="", tags=[]) {
        return new Promise((resolve, reject) => {
            try {
                if(!title) throw new Error("No title.");
                if(!message) throw new Error("No message.");
                let maxId = Math.max(...postData.map(post => post.pid));
                let newId = postData.length ? maxId + 1 : 0;
                let newPost = {
                    "pid": newId,
                    "title": title,
                    "message": message,
                    "giphy": giphy,
                    "comments": [],
                    "reactions": {
                        "thumbs_up": [],
                        "thumbs_down": [],
                        "heart": []
                    },
                    "tags": tags,
                    "timestamp": Date.now()
                };
                postData.unshift(new Post(newPost));
                resolve(newPost);
            } catch(err) {
                reject(err);
            }
        });
    }

    newComment(text){
        return new Promise((resolve, reject) => {
            try {
                if(!text) throw new Error("No comment.");
                let maxCid = Math.max(...this.comments.map(comment => comment.cid));
                let newCid = this.comments.length ? maxCid + 1 : 0;
                let newComment = {
                    "cid": newCid, 
                    "comment": text, 
                    "timestamp": Date.now()
                };
                this.comments.unshift(newComment);
                resolve(this);
            } catch(err){
                reject(err);
            }
        });
    }

    toggleReaction(emoji, uid){
        return new Promise((resolve, reject) => {
            try {
                if(!emoji) throw new Error("No reaction specified.");
                if(!uid) throw new Error("No UID specified.");
                let reactions = this.reactions[emoji];
                let uidIndex = reactions.indexOf(uid);
                if(uidIndex < 0) {
                    reactions.unshift(uid);
                } else {
                    reactions.splice(uidIndex, 1);
                }
                resolve(this);
            } catch(err){
                reject(err);
            }
        });
    }
}

module.exports = Post;
