'use strict'

const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


// const Project = require('./models/ProjectModels.js');
const Project = require('./models/ModelProject.js');

const Employee = require('./models/EmployeeModel.js');
const Manager = require('./models/ManagerModel.js');


const app = express();
app.use(express.static('client'));
app.use(json())
app.use(session({
    store: new RedisStore({url: process.env.REDIS_URL}  || 'redis://localhost:6379'),
    resave: false,
    saveUnitialized: false, 
    secret: 'thesecretkey'
}));

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/project-employee';

app.get('/api/title', (req, res) => {
    res.send({title: 'Welcome'});
});



// The Project API 
// GETS all of the projects from MONGO
app.get('/api/projects', getProjects);
function getProjects (req, res) {
    Project.find()
        .then(projects => {
            res.status(200).json(projects);
        });
};


// POSTS a new project to MONGO
app.post('/api/projects', createProject);
function createProject (req, res) {
    const proj = req.body

    Project.create(proj)
        .then(proj => {
            res.status(200).json(proj);
        });
};

// Updates the project object
app.put('/api/projects/:projectId', (req, res, err) => {
    const projectInformation = req.body;
    const projectId = req.params.projectId
    Project.findOneAndUpdate({"_id": projectId}, projectInformation, {upsert: true})
        .then(project => res.status(200).json(project))
        .catch(err)

}) ;

// Grabs a single project
app.get('/api/projects/:projectId', (req, res, err) => {
    const projectId = req.params.projectId
    Project.findOne({"_id": projectId})
        .then(project => res.status(200).json(project))
        .catch(err)

}) ;


// The Employee API  
// GETS all of the employees from MONGO
app.get('/api/employees', getEmployees);
function getEmployees (req, res) {
    Employee.find()
        .then(employees => {
            res.status(200).json(employees);
        });
};

// POSTS a new employee to MONGO.
app.post('/api/employees', createEmployee);
function createEmployee (req, res) {
    const emp = req.body

    Employee.create(emp)
        .then(emp => {
            console.log(emp)
            res.status(200).json(emp)
    })
};

// The Manager API  
// Creates a new manager in MONGO
app.post('/api/create-manager', createManager); 
function createManager(req, res) {
    const manager = req.body

    Manager.create(manager)
        .then(manager => {
            console.log(manager)
            res.status(200).json(manager);
        });
};

// Logs in a manager. 
app.post('/api/login', ( { session, body: {email, password}}, res, err ) => {
    Manager.findOne({ email })
        .then(manager => {
            if (manager && password === manager.password) {
                session.manager = manager;
                res.status(200).json(session.manager);
            } else {
                res.status(400).json(err)
            }
        })
})



mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL, () => {
     app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});