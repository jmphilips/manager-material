'use strict'

app.factory('DateFactory', function($http, $q){

    const GetDates = function() {
        return $q(function(resolve, reject){
            $http({
                method: "GET", 
                url: "/api/projects"
            })
            .success(function(dates){
                dates.forEach(date => {
                    date.url = `/#/project-view/${date._id}`
                })
                resolve(dates)
            })
        })
        .catch(function(error){
            reject(error)
        })
    };

    return {GetDates}
})
