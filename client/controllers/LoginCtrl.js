'use strict'

app.controller('LoginCtrl', function($scope, $http, $rootScope, $location){
    
    $scope.loginPressed = () => {

    const user = {
      email: $scope.email,
      password: $scope.password
    };

    console.log(user)

    $http.post('/api/login', user)
      .then(({data}) => {
        $rootScope.user = data;
        $location.path('/main');
      })
      .catch(() => {
        $location.path('/');
      });

    }

});