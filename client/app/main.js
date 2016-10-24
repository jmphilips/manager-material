'use strict'

var app = angular.module('project-manager', ['ngRoute', 'ui.calendar', 'ngMaterial'])

app.config($routeProvider => 
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main.html',
            controller: 'MainCtrl'      
        })
        .when('/new-project', {
            templateUrl: '/partials/create-new-project.html',
            controller: 'NewProjectCtrl'
        })
);
        