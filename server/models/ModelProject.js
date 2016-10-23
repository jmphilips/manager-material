'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model("Project", {
    title: String, 
    description: String,
    Employees: [String], 
    startDate: Date,
    endDate: Date
})