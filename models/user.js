const {Schema, model} = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity").default;
const jwt = require('jsonwebtoken');
const Role = require('../utility/role');
const {JWT_PRIVATE_KEY} = require('../config');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required:true,
        minlength:8,
        maxlength:255
    },
    password: {
        type: String,
        required:true,
        minlength:8,
        maxlength:1024
    },
    role: {
        type: String,
        enum: Object.keys(Role),
        default: Role.Member
    }
});
userSchema.methods.getAuthToken = function(){
    const token = jwt.sign({_id: this._id, role: this.role}, JWT_PRIVATE_KEY);
    return token;
}
const User = model('User', userSchema);
function validateUser(user){
    const complexityOptions = {
        min: 5,
        max: 1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
      };
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: passwordComplexity().required(),
        role: Joi.string().custom((value, helper) => {
            if (!Object.values(Role).includes(value)) {
                return helper.message(`Invalid Role, choose either of these [${Object.keys(Role)}]`);
            } else {
                return value
            }
        })
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;