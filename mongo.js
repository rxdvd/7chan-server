const { MongoClient } = require("mongodb");
const connectionURI = process.env.DB_CONNECTION_URI;

const init = async () => {
    let client = await MongoClient.connect(connectionURI);
    return client.db(process.env.DB_NAME);
};

module.exports = { init };
