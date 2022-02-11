const { init } = require("../mongo")

class Post {
    constructor(data){
        for(let key in data){
            this[key] = data[key];
        }
    }

    static get all() {
        return new Promise( async (resolve, reject) => {
            try {
                const db = await init();
                const postsData = await db.collection('posts').find().toArray();
                const posts = postsData.map(post => new Post(post));
                resolve(posts);
            } catch(err) {
                reject(err);
            }
        });
    }

    static byID(pid) {
        return new Promise( async (resolve, reject) => {
            try {
                if(!pid) throw new Error("No post id specified.");

                const db = await init();
                const postsData = await db.collection('posts').find({
                    pid: parseInt(pid)
                }).toArray();

                if(!postsData[0]) throw new Error("Post not found.");
                resolve(new Post(postsData[0]));
            } catch(err) {
                reject(err);
            }
        });
    }

    static newPost(title, message, giphy="", tags=[]) {
        return new Promise( async (resolve, reject) => {
            try {
                if(!title) throw new Error("No title.");
                if(!message) throw new Error("No message.");

                const db = await init();
                const sortedPosts = await db.collection('posts').find().sort({pid:-1}).toArray();

                let newId = sortedPosts.length ? sortedPosts[0].pid + 1 : 0;
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

                const postsData = await db.collection('posts').insertOne(newPost);

                resolve(new Post({_id: postsData.insertedId, ...newPost}));
            } catch(err) {
                reject(err);
            }
        });
    }

    newComment(text){
        return new Promise( async (resolve, reject) => {
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

                const db = await init();
                await db.collection('posts').findOneAndUpdate({
                    pid: parseInt(this.pid)
                },{
                    $set: { comments: this.comments }
                });

                resolve(this);
            } catch(err){
                reject(err);
            }
        });
    }

    toggleReaction(emoji, uid){
        return new Promise( async (resolve, reject) => {
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

                const db = await init();
                await db.collection('posts').findOneAndUpdate({
                    pid: parseInt(this.pid)
                },{
                    $set: { reactions: this.reactions }
                });

                resolve(this);
            } catch(err){
                reject(err);
            }
        });
    }
}

module.exports = Post;
