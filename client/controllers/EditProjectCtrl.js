'use strict'

app.controller('EditProjectCtrl', function($scope, $http, $location, $routeParams){

    $scope.submitProjectPressed = () => {

        const projectId = $routeParams.projectId

        const project = {
            company: $scope.company,
            email: $scope.email,
            contactName: $scope.contactName,
            description: $scope.description,
            start: $scope.start,
            end: $scope.end,
        }

        const projectPath = `/api/projects/${projectId}`;

        $http.put(projectPath, project)
        .then(() => {
            $location.path('/')
        })

    }

});