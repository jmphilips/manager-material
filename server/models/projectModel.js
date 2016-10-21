'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model("Project", {
    name: String, 
    description: String,
    Employees: [String]
})