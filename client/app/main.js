'use strict'

var app = angular.module('project-manager', ['ngRoute', 'ui.calendar'])

app.config($routeProvider => 
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main.html',
            controller: 'MainCtrl'      
        })
)
        