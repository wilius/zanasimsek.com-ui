'use strict';

angular.module('ranty.resume', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resume', {
    templateUrl: 'app/pages/resume/resume.html',
    controller: 'ResumeCtrl'
  });
}])

.controller('ResumeCtrl', [function() {

}]);