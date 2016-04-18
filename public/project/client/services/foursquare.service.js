"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .factory("FourSquareService", fourSquareService);

    function fourSquareService($http){
        //Foursquare API details
        var client_id = "NAI3NNBC3VMAH4J4QGIPU3GMUAAYFZLL4DKUHJIYTJE11T0S";
        var client_secret = "MWQ5YCT0QGQMTIEZXCDEXB0FE1YKMC3JGIIJGW3HU3AJNNTR";
        var food_id = "4d4b7105d754a06374d81259";


        var api = {
            findPopularRestByLocation: findPopularRestByLocation,
            findPopularRestDefault: findPopularRestDefault
        };
        return api;

        function findPopularRestByLocation(latlon){
            var apiUrl = "https://api.foursquare.com/v2/venues/explore?client_id=" +
                ""+client_id+"&client_secret="+client_secret+"" +
                "&v=20130815&ll="+latlon+"&section=food&limit=6&venuePhotos=1";
            return $http.get(apiUrl);

        }

        function findPopularRestDefault(){
            var apiUrl = "https://api.foursquare.com/v2/venues/explore?client_id=" +
                ""+client_id+"&client_secret="+client_secret+"" +
                "&v=20130815&ll=42.33,-71.15&section=food&limit=6&venuePhotos=1";
            return $http.get(apiUrl);

        }
    }
})();