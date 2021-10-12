'use strict';

angular.module('ranty.services', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', {
    templateUrl: 'app/pages/services/services.html',
    controller: 'ServicesCtrl'
  });
}])

.controller('ServicesCtrl', [function() {

}]);