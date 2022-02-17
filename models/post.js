const db = require("../postgres");

class Post {
    constructor(data){
        for(let key in data){
            this[key] = data[key];
        }
    }

    static get all() {
        return new Promise( async (resolve, reject) => {
            try {
                const postsData = await db.query("SELECT * FROM posts");
                const posts = postsData.rows.map(post => new Post(post));
                const commentsData = await db.query("SELECT * FROM comments");
                const comments = commentsData.rows;
                const reactionsData = await db.query(`
                    SELECT pid, name, uid FROM reactions 
                    JOIN emojis ON reactions.eid = emojis.eid
                `);
                const reactions = reactionsData.rows;
                const emojisData = await db.query("SELECT name FROM emojis");
                const emojis = emojisData.rows.map(e => e.name);
                
                posts.forEach(post => {
                    post.comments = comments.filter(comment => comment.pid === post.pid)
                    .map(comment => {
                        comment.timestamp = parseInt(comment.timestamp);
                        delete comment.pid;
                        return comment;
                    });
                    post.reactions = {};
                    emojis.forEach(emoji => {
                        post.reactions[emoji] = [];
                    });
                    for(let reaction in post.reactions) {
                        post.reactions[reaction] = reactions
                        .filter(r => r.name === reaction && r.pid === post.pid)
                        .map(r => r.uid);
                    }
                    post.tags = post.tags ? post.tags.split(", ") : [];
                    post.timestamp = parseInt(post.timestamp);
                });

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

                const postsData = (await db.query(`
                    SELECT posts.*, cid, comment, comments.timestamp AS c_time,  
                    emojis.name AS reaction, uid FROM posts 
                    LEFT JOIN comments ON posts.pid = comments.pid 
                    LEFT JOIN reactions ON posts.pid = reactions.pid 
                    LEFT JOIN emojis ON reactions.eid = emojis.eid 
                    WHERE posts.pid = $1
                `, [pid]));
                if(!postsData.rows.length) throw new Error("Post not found.");

                const emojisData = await db.query("SELECT name FROM emojis");
                const emojis = emojisData.rows.map(e => e.name);

                let comments = postsData.rows
                .filter(row => row.cid)
                .filter((row, index, array) => {
                    return array.findIndex(e => e.cid === row.cid) === index
                })
                .map(({cid, comment, c_time}) => ({
                    cid: cid,
                    comment: comment,
                    timestamp: parseInt(c_time)
                }));

                let post = {
                    pid: postsData.rows[0].pid,
                    title: postsData.rows[0].title,
                    message: postsData.rows[0].message,
                    giphy: postsData.rows[0].giphy,
                    comments: comments,
                    reactions: {},
                    tags: postsData.rows[0].tags ? postsData.rows[0].tags.split(", ") : [],
                    timestamp: parseInt(postsData.rows[0].timestamp)
                }

                emojis.forEach(emoji => {
                    post.reactions[emoji] = postsData.rows
                    .filter(row => row.reaction === emoji)
                    .map(row => row.uid);
                });

                resolve(new Post(post));
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

                const emojisData = await db.query("SELECT name FROM emojis");
                const emojis = emojisData.rows.map(e => e.name);

                const timestamp = Date.now();
                const postsData = await db.query(`
                    INSERT INTO posts (
                        title, message, giphy, tags, timestamp
                    ) VALUES (
                        $1, $2, $3, $4, $5
                    ) RETURNING *
                `, [
                    title,
                    message,
                    giphy,
                    tags.join(", "),
                    timestamp
                ]);

                let post = {
                    ...postsData.rows[0],
                    comments: [],
                    reactions: {},
                    timestamp: timestamp
                };

                emojis.forEach(emoji => {
                    post.reactions[emoji] = [];
                });

                resolve(new Post(post));
            } catch(err) {
                reject(err);
            }
        });
    }

    newComment(text){
        return new Promise( async (resolve, reject) => {
            try {
                if(!text) throw new Error("No comment.");
                let newComment = {
                    comment: text, 
                    timestamp: Date.now()
                };

                let result = await db.query(`
                    INSERT INTO comments (
                        comment, timestamp, pid
                    ) VALUES (
                        $1, $2, $3
                    ) RETURNING *
                `, [newComment.comment, newComment.timestamp, this.pid]);
                
                newComment.cid = result.rows[0].cid;
                this.comments.push(newComment);

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
                    await db.query(`
                        INSERT INTO reactions (
                            eid, pid, uid
                        ) 
                        SELECT eid, $1 AS pid, $2 AS uid FROM emojis 
                        WHERE name = $3
                    `, [this.pid, uid, emoji]);
                    reactions.unshift(uid);
                } else {
                    await db.query(`
                        DELETE FROM reactions USING emojis 
                        WHERE reactions.eid = emojis.eid 
                        AND emojis.name = $1 
                        AND reactions.uid = $2 
                        AND reactions.pid = $3
                    `, [emoji, uid, this.pid]);
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
