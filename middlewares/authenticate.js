const jwt = require("jsonwebtoken");
const {JWT_PRIVATE_KEY} = require('../config');
const CustomError = require("../utility/CustomError");

module.exports = function(req, res, next){
    const token = req.header('x-jwt');
    if(!token) throw new CustomError('Token not provided, please provide jwt token in the header.', 401);
    try{
        const decoded =  jwt.verify(token, JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }catch(ex){
        throw new CustomError('Invalid token.', 400);
    }
}