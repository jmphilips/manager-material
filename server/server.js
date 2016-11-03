'use strict'

const express = require('express');
const mongoose = require('mongoose');
const { json, urlencoded } = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const moment = require('moment');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Slack = require('node-slack');
const slack = new Slack('https://hooks.slack.com/services/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');
const transporter = nodemailer.createTransport(
    smtpTransport('smtps://project.manager.helper@gmail.com:iloveakie@smtp.gmail.com')
);

const _ = require('lodash')

// Mongoose Models
const Project = require('./models/ModelProject.js');
const Employee = require('./models/EmployeeModel.js');
const Manager = require('./models/ManagerModel.js');


// Static wares
const app = express();
app.use(express.static('client'));
app.use(json())
app.use(urlencoded({extended: true}))
app.use(session({
    store: new RedisStore({url: process.env.REDIS_URL}  || 'redis://localhost:6379'),
    resave: false,
    saveUnitialized: false, 
    secret: 'thesecretkey'
}));

// Environment Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/project-employee';


// The Project API 
// GETS all of the projects from MONGO
app.get('/api/projects', getProjects);
function getProjects (req, res) {
    Project.find()
        .then(projects => {
            res.status(200).json(projects);
        });
};

// This slack post sends the project updates to slack with the /check_project #projectId command 
app.post('/slack-slash/get-project', function(req, res){
  //take a message from Slack slash command
    const title = req.body.text 
    Project.findOne( {title} )
        .then(project => {

        let newString = "";
        project.updates.forEach(update => {newString += `${moment(update.timeStamp).format('MMM DD h:mm a')}: ${update.message}\n`})

            var body = {
                response_type: "in_channel",
                "attachments": [
                    {
                        "text": "Title: " + project.title + '\n' + 
                                `Updates:\n` + newString
                    }
                ]
            };
            res.send(body);
        })   
})


//////////////////////////////////////////////////////////  FIX THIS
// Returns the list of projects that an employee is working on on the slack command /check_employee #employee.lastName
// app.post('/slack-slash/get-employee', function(req, res){
//   //take a message from Slack slash command
//     const lastName = req.body.text 
//         Project.find()
//         .then(projects => {
//             Employee.findOne({ lastName })
//                 .then(employee => {
                    
//                     console.log(projects)
//                     console.log(employee._id)
//                     let stringToSend = `${employee.firstName} is currently working on`
//                     projects.forEach(project => {
//                         console.log("test log:  ", _.includes(project.employees, employee._id))
//                         if ( _.includes(project.employees, employee.id)) { stringToSend += `${project}`}
//                     })

//                     // This is the message that is sent back to slack. 
//                     let body = {
//                         response_type: "in_channel",
//                          "attachments": [
//                             {
//                                 "text": stringToSend     
//                             }
//                         ]
//                     };
//                     res.send(body);
//                 })  
//             })   
// });



app.post('/slack-slash/get-employee', function(req, res){
  //take a message from Slack slash command
    const lastName = req.body.text 

        Project.find()
        .then(projects => {

            Employee.findOne({ lastName })
                .then(employee => {
                    
                    

                    let projectFiltered = projects.filter((project) => {return project.employees.indexOf(employee._id) > -1 })
                    let newArray = projectFiltered.map(proj => {return `{proj.title}\n`})
                    console.log(newArray)
                    
            
                    // This is the message that is sent back to slack. 
                    let body = {
                        response_type: "in_channel",
                         "attachments": [
                            {
                                "text": `Employee:  ${employee.firstName} ${employee.lastName} \n` +
                                        `Projects: ${newArray}`      
                            }
                        ]
                    };
                    res.send(body);
                })  
            })   
});


// Updates the project via a command in slack. 
// Example command is /update_project 
// takes a parameter seperated by a | 
app.post('/slack-slash/update-project', function(req, res){
    const [title, update] = req.body.text.split(" | ");
      Project.findOneAndUpdate({"title": title}, {$push: {updates: {message: update, timeStamp: moment()}}}, {upsert: true, new: true})
      .then(project => {

            let newString = ""
            project.updates.forEach(update => {newString += `${moment(update.timeStamp).format('MMM DD h:mm a')}: ${update.message} \n \n`})

        // Sends an email with all of the updates
            transporter.sendMail({
                from: 'project.manager.helper@gmail.com',
                to: `${project.email}`,
                subject: `Updates about ${project.title}`,
                text: newString
            }, (error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Message sent`);
                }
            });

            // This is the message that is sent back to slack. 
            let body = {
                response_type: "in_channel",
                        "attachments": [
                            {
                                "text": `Updated ${project.title}`
                            }
                        ]
            };
            res.send(body);
      })
})


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
    let updatedProject
    const projectInformation = req.body;
    const projectId = req.params.projectId
    Project.findOneAndUpdate({"_id": projectId}, projectInformation, {upsert: true})
        .then(project => {
            res.status(200).json(project) 
        })
        .catch(err)
});

// Triggers the send email function. 
app.get('/api/send-email/:projectId', (req, res, err) => {
    const projectId = req.params.projectId
    Project.findOne({"_id": projectId})
        .then(project => {

        let newString = ""
        project.updates.forEach(update => {newString += `${moment(update.timeStamp).format('MMM DD h:mm a')}: ${update.message} \n \n`})

        if(project.updates.length > 0) {
            transporter.sendMail({
                from: 'project.manager.helper@gmail.com',
                to: `${project.email}`,
                subject: `Updates about ${project.title}`,
                text: newString

            }, (error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Message sent`);
                }
            });
        }
        res.end()
        })
})


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
            res.status(200).json(emp)
    })
};

// Grabs the employees
app.get('/api/employees/:employeeId', (req, res, err) => {
    const employeeId = req.params.employeeId
    Employee.findOne({"_id": employeeId})
        .then(employee => res.status(200).json(employee))
        .catch(err)
});

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
});


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL, () => {
     app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});