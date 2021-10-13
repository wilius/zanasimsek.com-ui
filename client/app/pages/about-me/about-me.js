'use strict';

angular.module('ranty.about-me', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about-me', {
            templateUrl: 'app/pages/about-me/about-me.html',
            controller: 'AboutMeCtrl'
        });
    }])

    .controller('AboutMeCtrl', ["$scope", function ($scope) {
        $scope.content = {
            name: "Zana Şimşek",
            image: "images/photo.png",
            age: 30,
            residence: "TR",
            address: "Istanbul, TR",
            email: "info@zanasimsek.com",
            aboutMe: "<p>Hey! I’m Zana Şimşek. I'm working for " +
                "<a href='https://www.openpayd.com/uk' target='_blank'><img class='openpayd-logo' src='images/about-me/OpenPayd_Logo.svg'></a> as a Software Architect. </p>" +
                "<p></p>" +
                "<p>Feel free to contact with me about my posts by a blog comment or by email.</p>",
            socialLinks: [
                {
                    iconClass: "fa-twitter",
                    href: "https://twitter.com/zanasimsek",
                    title: "Twitter"
                },
                {
                    iconClass: "fa-github",
                    href: "https://github.com/wilius",
                    title: "Github"
                },
                {
                    iconClass: "fa-stack-overflow",
                    href: "https://stackoverflow.com/users/2683243/zana-simsek",
                    title: "Stack Overflow"
                },
                {
                    iconClass: "fa-hackerrank",
                    href: "https://hackerrank.com/zanasimsek",
                    title: "Hackerrank"
                }
            ],
            titles: [
                "Software Architect",
                "Java Developer",
                "Open Source Advocate"
            ]
        };
    }]);