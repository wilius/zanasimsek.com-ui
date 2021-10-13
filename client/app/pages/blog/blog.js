'use strict';

angular.module('ranty.blog', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/blog', {
            templateUrl: 'app/pages/blog/blog.html',
            controller: 'BlogCtrl'
        });
    }])

    .controller('BlogCtrl', ["$scope", function ($scope) {

        $scope.posts = [
            {
                id: 1,
                image: "images/blog/blog_post_1.jpg",
                title: "Bootstrap is the Most Popular Framework",
                date: new Date()
            },
            {
                id: 2,
                image: "images/blog/blog_post_1.jpg",
                title: "Java is the Most Elegant Language",
                date: new Date(2020, 1, 1)
            }
        ];

        $scope.showYear = function (post) {
            return post.date.getFullYear() !== new Date().getFullYear();
        }

    }]);