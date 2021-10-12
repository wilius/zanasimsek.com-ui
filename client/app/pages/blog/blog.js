'use strict';

angular.module('ranty.blog', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog', {
    templateUrl: 'app/pages/blog/blog.html',
    controller: 'BlogCtrl'
  });
}])

.controller('BlogCtrl', [function() {

}]);