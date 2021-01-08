// imports
const {SERVER_PORT} = require('./config');
const winston = require('winston');
const express = require('express');
const app  = express();

// startup files
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);

// listening 
const port = SERVER_PORT || 3000;
app.listen(port, ()=> winston.info(`Server running on localhost:${port}`));