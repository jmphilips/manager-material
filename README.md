# Manager Material

Manager Material is a tool that allows a manager to keep track of projects that company or agency is working on. 
While I was able to incorporate a lot of technologies that I learned at Nashville Software School, I decided to 
use new technologies in different features 

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