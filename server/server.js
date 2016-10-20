'use strict'

const express = require('express');

const app = express();
const mongoose = require('mongoose');

app.use(express.static('client'));


const PORT = process.env.port || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/project-employee';


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL, () => {
     app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});
   