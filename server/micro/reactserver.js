var express = require('express');
var path = require('path');
var reactApp = express();

reactApp.use(express.static(path.join(__dirname, '../../build')));

/*
 * Visit the home page
 */
reactApp.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});
function initialize() {
    reactApp.listen(8080, function () {
        console.log('My site started at http://%s:%s', process.env.HOST, '8080');
    });
}

module.exports = {
    initialize,
}