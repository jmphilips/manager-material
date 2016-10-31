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

        const GetEmployeeById = function(params) {
        return $q(function(resolve, reject){
            $http({
                method: "GET", 
                url: `/api/employees/${params}`
            })
            .success(function(employee){
                resolve(employee)
            })
        })
        .catch(function(error){
            reject(error)
        })
    };


    return {GetEmployees, GetEmployeeById}
})