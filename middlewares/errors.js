const {log} = require("winston");
// const type = ["silly", "debug", "verbose", "info", "warn", "error"];

module.exports = function(err, req, res, next){
    // log('error', err.message, {stack: err.stack});
    log('error', err.message);

    const success = err.success || false;
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Something wrong with the server.';
    
    res.status(statusCode).json({
        success: success,
        statusCode: statusCode,
        message: message
    });
    next();
}