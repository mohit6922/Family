const {User, validate} = require('../models/user');
const {hash} = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const Role = require('../utility/role');
const CustomError = require('../utility/CustomError');
const router = express.Router();

router.get('/', authenticate, authorize([Role.Owner, Role.Admin]), async(req, res)=>{
    return res.send(await User.find());
});
router.post('/', async(req, res)=>{
    // Validating user input
    const {value, error} = validate(req.body);
    if(error) throw new CustomError(error.details[0].message, 400);
    
    // Validating user via OTP
    
    // Checking if email already registered
    let user = await User.findOne({email:value.email});
    if(user) throw new CustomError('Email already registered.', 400);
    
    // Creating user object
    user = await User.create(_.pick(value, ['name', 'email', 'password', 'role']));
    
    // Updating hashed password
    user.password = await hash(user.password, 10);
    
    // Saving the user object inside DB
    await user.save()

    // Get token for authentication
    const token = user.getAuthToken();

    // Returning the token to the response header and user details in body
    return res.header('x-jwt', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
});

module.exports = router;