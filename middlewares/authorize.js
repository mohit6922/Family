// const jwt = require('express-jwt');
// const { secret } = require('config.json');

const CustomError = require("../utility/CustomError");

module.exports = function (roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            // user's role is not authorized
            throw new CustomError('Access Forbidden', 403);
        }
        // authentication and authorization successful
        next();
    }
}