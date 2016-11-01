'use strict'

app.controller('EmployeeViewCtrl', function($scope, EmployeeFactory, $routeParams, DateFactory, lodash){
    
    let employeeId = $routeParams.employeeId;

    EmployeeFactory.GetEmployeeById(employeeId)
    .then((employee) => {
        $scope.employee = employee
    
        DateFactory.GetDates()
        .then((projects) => {  
            $scope.projects = projects.filter((project) => {return lodash.includes(project.employees, employee._id)})
        })
    })
})