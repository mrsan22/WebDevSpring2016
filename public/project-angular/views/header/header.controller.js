"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location){
        $scope.callToSearch = callToSearch;

        //Implement event handler
        function callToSearch(restname, location){
            if(!restname){
                $location.url('/search/location='+location);
            }
            else{
            $location.url('/search/restname='+restname+'&location='+location);
            }

        }
    }
})();