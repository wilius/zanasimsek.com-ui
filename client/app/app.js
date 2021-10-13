'use strict';

// Declare app level module which depends on views, and core components
angular.module('ranty', [
    'ngRoute',
    'ngSanitize',
    'ranty.directive',
    'ranty.templates',
    'ranty.home',
    'ranty.blog',
    'ranty.blog.post',
    'ranty.about-me'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);