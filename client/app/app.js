'use strict';

// Declare app level module which depends on views, and core components
angular.module('ranty', [
    'ngRoute',
    'ranty.directive',
    'ranty.templates',
    'ranty.blog',
    'ranty.blog.post',
    'ranty.contact',
    'ranty.home',
    'ranty.portfolio',
    'ranty.resume',
    'ranty.services'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);