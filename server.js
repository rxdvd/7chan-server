const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
    
});

app.get('/post/:pid', (req, res) => {

});

app.post('/posts', (req, res) => {

});

app.post('/post/:pid/emoji', (req, res) => {

});

module.exports = app;
