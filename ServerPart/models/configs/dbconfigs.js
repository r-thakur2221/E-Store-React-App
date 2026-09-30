const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://localhost:27017";
const dbName = "group26";
const colName = "users";
const oid = mongodb.ObjectId;
module.exports = {
    MongoClient,
    connectionURL,
    dbName,
    colName,
    oid,
}