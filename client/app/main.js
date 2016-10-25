'use strict'

var app = angular.module('project-manager', ['ngRoute', 'ui.calendar', 'ngMaterial'])

app.config($routeProvider => 
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main.html',
            controller: 'MainCtrl'      
        })
        .when('/edit-project/:projectId', {
            templateUrl: '/partials/edit-project.html',
            controller: 'EditProjectCtrl'
        })
        .when('/create-project', {
            templateUrl: '/partials/create-new-project.html',
            controller: 'NewProjectCtrl'
        })
);
        