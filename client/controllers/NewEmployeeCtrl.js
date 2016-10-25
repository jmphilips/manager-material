'use strict'

app.controller('NewEmployeeCtrl', function($scope, $http, $location) {

    $scope.items = ["Elixir", "C#", "JavaScript", "Ruby", "Python"];
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



    $scope.submitButtonPressed = () => {
        const emp = {
            email: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            skills: $scope.selected
        };

        $http.post('/api/employees', emp)
        .then(() => {
            $location.path('/')
        })
    }
});