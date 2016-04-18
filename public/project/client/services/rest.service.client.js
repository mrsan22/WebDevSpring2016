"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .factory("RestService", RestService);

    function RestService($http){

        //Declaration of Interface
        var restServiceApi = {
            addRest : addRest
        };

        return restServiceApi;

        function addRest(rest){
            $http.post("/api/project/restaurant",rest);
        }
    }
})();