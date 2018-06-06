const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "What's your first name?"]},
    last_name: {type: String, required: [true, "What's your last name?"]},
    email: {type: String, required: [true, "Enter your email address"]}, //ADD VALIDATIONS
    password: {type: String, required: [true, "Must have a password"], minlength: [8, "Password must be at least 8 characters"]},
    profile_image: {type: String},
    bio: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    instruments: [],
    genres: [],
    skill: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Users', userSchema);