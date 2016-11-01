'use strict'

app.controller('ProjectViewCtrl', function($routeParams, ProjectFactory, $scope, $http){

    let projectId = $routeParams.projectId;
    let updatesArray = [];


    ProjectFactory.GetProject(projectId)
    .then(project => {
        $scope.project = project
        project.updates.forEach(update => updatesArray.push(update))
    })

    

    $scope.updateProjectPressed = () => {
        $scope.toUpdate.timeStamp = moment()
        updatesArray.push($scope.toUpdate)  
        const project = {
            updates: updatesArray
        }
       

        const projectPath = `/api/projects/${projectId}`;

        $http.put(projectPath, project)
        .then(() => {
                $scope.toUpdate.message = ""
                updatesArray = [];
               ProjectFactory.GetProject(projectId)
    .then(project => {
        $scope.project = project
        project.updates.forEach(update => updatesArray.push(update))
    })
          
        })

    };

})