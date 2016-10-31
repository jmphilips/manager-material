'use strict'

app.controller('EditProjectCtrl', function($scope, $http, $location, $routeParams, EmployeeFactory, ProjectFactory){

    const projectId = $routeParams.projectId;


    const empAndProjTechMatch = () => {
        

        EmployeeFactory.GetEmployees()
        .then((employees) => {

            ProjectFactory.GetProject(projectId) 
            .then(({technologies}) => {

                $scope.items = []
                technologies.forEach((tech) => {employees.forEach( (emp) => { if(emp.skills.includes(tech)) {$scope.items.push(emp)} })})
            })})}

            
      $scope.selected = [];
      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };
        

        
    
 

    empAndProjTechMatch()

    $scope.submitProjectPressed = () => {

        const project = {
            company: $scope.company,
            email: $scope.email,
            contactName: $scope.contactName,
            description: $scope.description,
            start: $scope.start,
            end: $scope.end,
            employees: $scope.selected
        }

        const projectPath = `/api/projects/${projectId}`;

        $http.put(projectPath, project)
        .then(() => {
            $location.path('/')
        })
    };

})