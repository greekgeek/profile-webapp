require('dotenv').config({ path: '.env' });
const AppServer = require('../server/micro/appserver');
const ReactServer = require('../server/micro/reactserver');
ReactServer.initialize();
AppServer.initialize();