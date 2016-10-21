'use strict'

const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser')


// Mongoose Models
const app = express();
app.use(express.static('client'));
app.use(json())


const PORT = process.env.port || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/project-employee';

const Project = require('./models/ProjectModel.js')
const Employee = require('./models/EmployeeModel.js')

app.get('/api/title', (req, res) => {
    res.send({title: 'Welcome'});
});





app.post('/api/create-project', createProject)

function createProject (req, res) {
    const proj = req.body

    Project.create(proj)
        .then(proj => {
            res.status(200).json(proj);
        });
};


app.post('/api/create-employee', createEmployee)

function createEmployee (req, res) {
    const emp = req.body
        Employee.create(emp)
            .then(emp => {
                console.log(emp)
                res.status(200).json(emp)
            });
};




mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL, () => {
     app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});
   