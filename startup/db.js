const {DB_URI} = require('../config');
const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = function(){ 
    mongoose.connect(DB_URI, { useUnifiedTopology: true })
    .then(winston.info('Connected to Database'));
}