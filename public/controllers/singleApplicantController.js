var singleApplicantCtrl = angular.module('singleApplicantCtrl', ['applicantModule']);
singleApplicantCtrl.controller('singleApplicationController', function($scope, $http, $sce, appFactory){
   $scope.applicant = {};
   $scope.id = appFactory;
   $scope.getNext = getNext;
   $scope.getPrevious = getPrevious;
   $scope.rejectAppl = rejectAppl;
   $scope.shortlistAppl = shortlistAppl;

   getOne();

   function getOne(){
      $http.get('/applicant/' + $scope.id.cur_id)
        .then(function(data){
           sendData(data.data);
        },
        function(data) {
            console.log('Error: ' + data);
        });
   }

    function getNext(id){
      $http.get('/nextapplicant/' + id)
        .then(function(data){
           sendData(data.data[0]);
        },
        function(data) {
            console.log('Error: ' + data);
        });
   }

    function getPrevious(id){
        console.log('ID : ', id);
      $http.get('/prevapplicant/' + id)
        .then(function(data){
           sendData(data.data[0]);
        },
        function(data) {
            console.log('Error: ' + data);
        });
   }

    function shortlistAppl(id){
      $scope.applicant.status = 'Shortlisted';
      var stat = { status : 'Shortlisted'};
      $http.put('/updateStatus/' + id , stat)
        .then(function(data){
           console.log("Shortlisted");
        },
        function(data) {
            console.log('Error: ' + data);
        });
   }

    function rejectAppl(id){
      $scope.applicant.status = 'Rejected';
      var stat = { status : 'Rejected'};
      $http.put('/updateStatus/' + id , stat)
        .then(function(data){
           console.log("Rejected");
        },
        function(data) {
            console.log('Error: ' + data);
        });
   }


  function sendData(data){
            $scope.applicant = data;
            var ext = $scope.applicant.resume.filename.split('.')[1];
            if(ext != 'pdf'){
                officeUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=';
                fileUrl = $scope.applicant.resume.url;
                finalUrl = officeUrl + fileUrl;
            }
            else{
                officeUrl = 'http://docs.google.com/gview?url=';
                fileUrl = $scope.applicant.resume.url;
                finalUrl = officeUrl + fileUrl + '&embedded=true';
            }
            $scope.trustUrl = $sce.trustAsResourceUrl(finalUrl);
  }

});