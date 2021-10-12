'use strict';

angular.module('ranty.portfolio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/portfolio', {
    templateUrl: 'app/pages/portfolio/portfolio.html',
    controller: 'PortfolioCtrl'
  });
}])

.controller('PortfolioCtrl', [function() {

}]);