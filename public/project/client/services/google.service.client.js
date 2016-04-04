"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .factory("GoogleService", googleService);

    function googleService($http){

        var api = {
            findAddressByLatLong : findAddressByLatLong
        };
        return api;

        function findAddressByLatLong(latlon){
            var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlon;
            return $http.get(url);
        }
    }

})();
