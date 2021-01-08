const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users.js');
const errors = require('../middlewares/errors');

module.exports = function(app){   
    // middlewares 
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(errors);
}