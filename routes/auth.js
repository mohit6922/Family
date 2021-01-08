const express = require('express');
const { User } = require('../models/user');
const {compare} = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const CustomError = require('../utility/CustomError');
const router = express.Router();

router.post('/', async(req, res)=>{
    // Validating the user input
    const {value, error} = validate(req.body);
    if(error) throw new CustomError(error.details[0].message, 400);
    
    // Authenticating User via OTP
    
    // Checking if Email id Exists
    const user = await User.findOne({email: value.email});
    if(!user) throw new CustomError('No such user exists.', 400);

    // Check if password matches
    const result = await compare(value.password, user.password);
    if(!result) throw new CustomError('Invalid Email/Password', 400);

    // Get token for authentication
    const token = user.getAuthToken();

    // Returning the token to the response header and user details in body
    return res.header('x-jwt', token).send(_.pick(user, ['_id', 'name', 'email']));
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

module.exports = router;