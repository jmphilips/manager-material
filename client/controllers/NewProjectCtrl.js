'use strict'

app.controller('NewProjectCtrl', function($scope, $http, $location){

    $scope.createProject = () => {

        const project = {
            title: $scope.title,
        };

        $http.post('/api/create-project', project)
        .then(({data}) => {
            $location.path('/edit-project/' + data._id)
        })

    };
});