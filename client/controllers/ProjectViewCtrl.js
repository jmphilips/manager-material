'use strict'

app.controller('ProjectViewCtrl', function($routeParams, ProjectFactory, $scope, $http){

    let projectId = $routeParams.projectId;
    let updatesArray = [];
    let timeStampArray = [];

    ProjectFactory.GetProject(projectId)
    .then(project => {
        $scope.project = project
        project.updates.forEach(update => updatesArray.push(update))
        project.timeStamps.forEach(time => timeStampArray.push(time))
    })

    

    $scope.updateProjectPressed = () => {
      
        updatesArray.push($scope.toUpdate)
        timeStampArray.push(moment().utcOffset(-300))
        const project = {
            updates: updatesArray,
            timeStamps: timeStampArray
        }
        const projectPath = `/api/projects/${projectId}`;

        $http.put(projectPath, project)
        .then(() => {

               ProjectFactory.GetProject(projectId)
    .then(project => {
        $scope.project = project
        project.updates.forEach(update => updatesArray.push(update))
    })
          
        })

    };

})