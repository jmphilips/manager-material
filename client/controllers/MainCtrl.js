'use strict'

app.controller('MainCtrl', function($scope, DateFactory, EmployeeFactory){

   DateFactory.GetDates()
   .then(dates => {$scope.dates = dates});

   EmployeeFactory.GetEmployees()
   .then(employees => {$scope.employees = employees});

})