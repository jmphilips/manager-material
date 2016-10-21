'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model("Employee", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    skills: [String]
});