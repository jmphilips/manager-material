'use strict'

app.factory('DateFactory', function($http, $q){

    const GetDates = function() {
        return $q(function(resolve, reject){
            $http({
                method: "GET", 
                url: "/api/get-projects"
            })
            .success(function(dates){
                resolve(dates)
            })
        })
        .catch(function(error){
            reject(error)
        })
    };

    return {GetDates}
})
