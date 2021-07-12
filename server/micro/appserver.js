const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const AppServer = express();
const MongoClient = require('../db');
const cors = require('cors')
const MongoSever = 'portfolio-webapp.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@portfolio-webapp@';
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${MongoSever}`
AppServer.use(express.static(path.join(__dirname, 'build')));
AppServer.use(bodyParser.json())
function corsEnabled(req, callback) {
    var corsOptions;
    if (process.env.NODE_ENV === 'production') {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: '*' };
    }
    callback(null, corsOptions);
}
function initialize() {
    const MongoInstance = new MongoClient({ uri });
    MongoInstance.connect();
    AppServer.listen(process.env.SERVER_PORT, function () {
        console.log('My site started at http://%s:%s', process.env.HOST, process.env.SERVER_PORT);
    });
    AppServer.get('/api/profile/:userID',cors(corsEnabled), async function (req, res) {
        // console.log(req.params);
        const result = await MongoInstance.findQuery({ userID: req.params.userID }, 'profile')
        res.status(200).send({ result });
    });
}
module.exports = {
    initialize,
}