"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("HomeController", HomeController);

    function HomeController(NgMap){
        NgMap.getMap().then(function(map) {
            //console.log(map.getCenter());
            //console.log('markers', map.markers);
            //console.log('shapes', map.shapes);
        });
    }
})();