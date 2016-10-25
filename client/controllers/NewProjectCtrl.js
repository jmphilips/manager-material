'use strict'

app.controller('NewProjectCtrl', function($scope, $http, $location){

    $scope.createProject = () => {

        const project = {
            title: $scope.title,
        };

        $http.post('/api/projects', project)
        .then(({data}) => {
            $location.path('/edit-project/' + data._id)
        })

    };
});