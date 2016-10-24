'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model("Project", {
    title: String, 
    description: String,
    employees: [String], 
    start: String,
    end: String, 
    url: String, 
    stick: { type: Boolean, default: true },
})