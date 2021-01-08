const {configure, transports, exceptions} = require('winston');
require('express-async-errors');

module.exports = function(){
    const console = new transports.Console();
    const file = new transports.File({filename: 'errors.log'}); 
    configure({
        transports: [console,file]
    });
    exceptions.handle(console);
    process.on('unhandledRejection', (ex)=>{
        throw ex;
    });
}
