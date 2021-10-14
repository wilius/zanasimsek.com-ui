'use strict';

angular.module('ranty.blog.author', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog/author/:authorId?', {
    templateUrl: 'app/pages/blog/author/author.html',
    controller: 'BlogAuthorCtrl'
  });
}])

.controller('BlogAuthorCtrl', [function() {

}]);