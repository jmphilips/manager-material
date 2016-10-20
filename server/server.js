'use strict'

const express = require('express');

const app = express();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const PORT = process.env.port || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/project-employee';



mongoose.connect(MONGODB_URL, () => {
     app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});
   