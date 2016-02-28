"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("SearchController", searchController);

        function searchController($scope, $routeParams, YelpService, $rootScope){
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