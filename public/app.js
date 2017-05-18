//Main file
var app = angular.module('applicantApp', ['addApplicantCtrl', 'singleApplicantCtrl', 'viewApplicantCtrl', 'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider, $locationProvider){
        //The route provider handles the client request to switch route
        $routeProvider.when('/addapplicant', {          
            templateUrl: 'partials/addApplicant.html',
            controller: 'addApplicantController'            
        })
        .when('/viewApplications', {
            templateUrl: 'partials/viewApplicant.html',
            controller: 'viewApplicantController'
        })
        .when('/singleApplicationView', {
            templateUrl: 'partials/singleApplicant.html',
            controller: 'singleApplicationController'
        })
        //Redirect to addapplicant in all the other cases.
        .otherwise({redirectTo:'/addapplicant'});
        //Add the API key to use filestack service
        filepickerProvider.setKey('AsnqMj6EOQKW84G4Q5Jv1z');

        $locationProvider.html5Mode(true);
});