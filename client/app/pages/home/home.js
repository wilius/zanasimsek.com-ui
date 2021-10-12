'use strict';

angular.module('ranty.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/pages/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', [function () {

    }]);