'use strict'

var app = angular.module('project-manager', ['ngRoute'])

app.config($routeProvider => 
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main.html',
            controller: 'MainCtrl'      
        })
)
        