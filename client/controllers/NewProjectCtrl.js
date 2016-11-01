'use strict'

app.controller('NewProjectCtrl', function($scope, $http, $location){


     
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

    $scope.createProject = () => {

        const project = {
            title: $scope.title,
            technologies: $scope.selected
        };

        $http.post('/api/projects', project)
        .then(({data}) => {
            $location.path('/edit-project/' + data._id)
        })

    };
});