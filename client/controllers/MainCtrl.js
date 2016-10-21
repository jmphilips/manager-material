'use strict'

app.controller('MainCtrl', function($scope, $http){
        $http
            .get('/api/title')
            .then(({data: {title}}) => $scope.title = title)
    });