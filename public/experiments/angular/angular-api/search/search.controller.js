"use strict";
(function() {
    angular
        .module("RestApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, YelpService){
        //Register event handler
        $scope.search = search;
        $scope.restname = $routeParams.restname;
        $scope.location = $routeParams.location;

        //
        if(($scope.restname || !$scope.restname) && $scope.location){
            search($scope.restname, $scope.location);
        }

        //Implement event handler
        function search(restname, location){
            //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    console.log(response);
                    $scope.data = response;
                }
            )
        }
    }
})();