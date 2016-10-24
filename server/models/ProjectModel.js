'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model("Project", {
    title: String, 
    description: String,
    employees: [String], 
    startDate: Date,
    endDate: Date, 
    url: String,
})
