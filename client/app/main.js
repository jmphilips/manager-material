'use strict'

angular.module('project-manager', ['ngRoute'])
    .config($routeProvider => 
        $routeProvider
            .when('/', {
                controller: 'controllers/MainCtrl',
                template: 'partials/main.html'
            })
    )
            