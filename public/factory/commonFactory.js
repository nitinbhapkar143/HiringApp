var applicantMod = angular.module('applicantModule', []);
applicantMod.factory('appFactory', function(){

    var appObj = {
        cur_id : 0,
        setCurrentApp : setCurrentApp
    };

    return appObj;

    function setCurrentApp(id){
        appObj.cur_id = id;
    };

});