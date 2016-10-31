'use strict'

app.controller('EmployeeViewCtrl', function($scope, EmployeeFactory, $routeParams){
    
    console.log("hell")

    const employeeId = $routeParams.employeeId;

    EmployeeFactory.GetEmployeeById(employeeId)
    .then(emp => {console.log(emp)})

})