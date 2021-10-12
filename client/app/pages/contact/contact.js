'use strict';

angular.module('ranty.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'app/pages/contact/contact.html',
    controller: 'ContactCtrl'
  });
}])

.controller('ContactCtrl', [function() {

}]);