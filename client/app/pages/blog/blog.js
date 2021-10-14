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
                cover: "images/blog/blog_post_1.jpg",
                title: "Bootstrap is the Most Popular Framework",
                date: new Date(),
                author: {
                    id: 1,
                    name: 'Zana Şimşek'
                },
                abstract: 'Description 1'
            },
            {
                id: 2,
                title: "Java is the Most Elegant Language",
                date: new Date(2020, 1, 1),
                author: {
                    id: 1,
                    name: 'Zana Şimşek'
                },
                abstract: 'Description 2'
            },
            {
                id: 3,
                cover: "images/blog/blog_post_1.jpg",
                title: "Java is the Most Elegant Language",
                date: new Date(2019, 1, 1),
                author: {
                    id: 1,
                    name: 'Zana Şimşek'
                },
                abstract: 'Description 3'
            },
            {
                id: 4,
                title: "Java is the Most Elegant Language",
                date: new Date(2018, 1, 1),
                author: {
                    id: 1,
                    name: 'Zana Şimşek'
                },
                abstract: 'Description 4'
            },
            {
                id: 5,
                cover: "images/blog/blog_post_1.jpg",
                title: "Java is the Most Elegant Language",
                date: new Date(2017, 1, 1),
                author: {
                    id: 1,
                    name: 'Zana Şimşek'
                },
                abstract: 'Description 5'
            }
        ];

        $scope.showYear = function (post) {
            return post.date.getFullYear() !== new Date().getFullYear();
        }

    }]);