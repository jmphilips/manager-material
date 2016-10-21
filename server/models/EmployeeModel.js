'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model("Employee", {
    firstName: String,
    lastName: String,
    skills: [String]
})