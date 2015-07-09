'use strict';

// angular.js main app initialization
var app = angular.module('app', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '../index.html',
                controller: HomeCtrl
            }).
            when('/about', {
                templateUrl: 'about.html',
                controller: AboutCtrl,
                activetab: 'about'
            }).
            when('/resume', {
                templateUrl: 'pages/resume.html',
                controller: ResumeCtrl,
                activetab: 'resume'
            }).
            when('/portfolio', {
                templateUrl: 'pages/portfolio.html',
                controller: PortCtrl,
                activetab: 'portfolio'
            }).
            when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: ContactCtrl,
                activetab: 'contact'
            }).
            otherwise({ redirectTo: '/' });
    }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
            $scope.part = $route.current.activetab;
        });

        // onclick event handlers
        $scope.showForm = function () {
            $('.contactRow').slideToggle();
        };
        $scope.closeForm = function () {
            $('.contactRow').slideUp();
        };

        // save the 'Contact Us' form
        $scope.save = function () {
            $scope.loaded = true;
            $scope.process = true;
            $http.post('sendemail.php', $scope.message).success(function () {
                $scope.success = true;
                $scope.process = false;
            });
        };
    }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);