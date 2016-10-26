'use strict'

app.factory('EmployeeFactory', function($http, $q){

    const GetEmployees = function() {
        return $q(function(resolve, reject){
            $http({
                method: "GET", 
                url: "/api/employees"
            })
            .success(function(employees){
                resolve(employees)
            })
        })
        .catch(function(error){
            reject(error)
        })
    };

    return {GetEmployees}
})