'use strict';

angular.module('ranty.blog.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog/:postId?', {
    templateUrl: 'app/pages/blog/post/post.html',
    controller: 'BlogPostCtrl'
  });
}])

.controller('BlogPostCtrl', [function() {

}]);