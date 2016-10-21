'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model("Manager", {
    email: String,
    password: String,
    firstName: String, 
    lastName: String
})