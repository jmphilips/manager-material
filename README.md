# Manager Material

Manager Material is a tool that allows a manager to keep track of projects that company or agency is working on. 
While I was able to incorporate a lot of technologies that I learned at Nashville Software School, I decided to 
use new technologies in different features 

If you want to check it out, here is a link:  http://manager-material.herokuapp.com

## Slack Integration 
Slack and other messaging apps like it are heavily used in the technology community, and they have the ability to be 
a great medium to improve both communication and workflow.  Manager Material uses custom /commands to check the status of projects or
employees and also to post updates about a selected project.  There are currently five commands.

```
/check_employee "[employee last name]" => "Employee Name: Current Projects"
/check_project "[project title]" => "Project Name: project updates"
/view_projects => "All of the projects"
/project_info "[project title]" => "Project Name: Project Description"
/update_project "[project title | update]" => "Updated project title" 
```

All of these slack integrations help not to disrupt the employee workflow, and they were made using a post request and response.

## Automated Email Updates
Manager Material also uses automated emails to keep customers updated.  When an employee sends an update to a project, an email 
is automatically sent via a package called nodemailer (https://www.npmjs.com/package/nodemailer).  The automated email feature 
is takes the task out of updating the customer out the employees' hands by automating the process. 

## Calendar View 
Last, the web portion of the app features a calendar view of all of the projects that the company or agency is currently working 
on.  For this feature, I used Angular UI Calendar (http://angular-ui.github.io/ui-calendar/).  This feature allows a manager to 
quickly see how busy the manager's company is at any given time.  

## Other Features Technologies Used 
As a member of Nashville Software School's Cohort 14, I heavily studied the MEAN stack and utilized the MEAN stack in this project.

* JavaScript and Node.js 
* Heroku 
* MongoDB 
* Mongoose 
* Angular 
* Angular Material 
* Bower 
* NPM



http://manager-material.herokuapp.com