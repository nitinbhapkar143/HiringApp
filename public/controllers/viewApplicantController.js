var viewApplicantCtrl = angular.module('viewApplicantCtrl', ['applicantModule']);
viewApplicantCtrl.controller('viewApplicantController', function($scope, $http, appFactory){
    $scope.applicants = [];
    //Retrieve all the applicants to show the viewApplicant
    getAll();
    $scope.setActiveAppl = appFactory;

    function getAll(){
        $http.get('/applicant')
        .then(function(data){
            $scope.applicants = data;
        },
        function(data) {
            console.log('Error: ' + data);
        });
    }


});