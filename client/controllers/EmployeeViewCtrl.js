'use strict'

app.controller('EmployeeViewCtrl', function($scope, EmployeeFactory, $routeParams){
    
    let employeeId = $routeParams.employeeId;

    EmployeeFactory.GetEmployeeById(employeeId)
    .then(employee => $scope.employee = employee)

})