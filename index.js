const port = 3000;

const app = require('./server');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
