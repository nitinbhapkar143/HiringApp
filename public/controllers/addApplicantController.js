var addCtrl = angular.module('addApplicantCtrl', []);
addCtrl.controller('addApplicantController', function($scope, $http, filepickerService){
    $scope.applicant = {};
    $scope.applicant.status = 'Screening';
    //Send the newly created Applicant to the server to store in the db
    $scope.createApplicant = function(){
        $http.post('/applicant', $scope.applicant)
            .then(function(data){
                console.log('added to database : ' + JSON.stringify(data));
                //Clean the form to allow the user to create new Applicantes
                $scope.applicant = {};
            },
            function(data) {
                console.log('Error: ' + data);
            });
    };
    //Single file upload, you can take a look at the options
    $scope.upload = function(){
        filepickerService.pick(
            {
                mimetypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf','application/doc'],
                language: 'en'
            },
            function(Blob){
                console.log('Added to Filestack : ' + JSON.stringify(Blob));
                $scope.applicant.resume = Blob;
                $scope.$apply();
            }
        );
    };
 
});