'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model("Project", {
    title: String, 
    company: String,
    email: String,
    contactName: String,
    description: String,
    employees: [String], 
    start: String,
    end: String, 
    url: String, 
    stick: { type: Boolean, default: true },
})




        

      
       