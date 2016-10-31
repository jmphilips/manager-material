'use strict'

app.factory('ProjectFactory', function($http, $q){

    const GetProject = function(params) {
        return $q(function(resolve, reject){
            $http({
                method: "GET", 
                url: `/api/projects/${params}`
            })
            .success(function(project){
                resolve(project)
            })
        })
        .catch(function(error){
            reject(error)
        })
    };


    return {GetProject}
})