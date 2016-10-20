'use strict'

const mongoose = require('mongoose');

module.exports = new mongoose.model("Project", {
    name: String, 
    description: String,
    Employees: [String]
})