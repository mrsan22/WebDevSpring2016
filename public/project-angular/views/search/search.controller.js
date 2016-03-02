"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("SearchController", searchController);

        function searchController($scope, $routeParams, YelpService, $rootScope){
            $scope.restname = $routeParams.restname;
            $scope.location = $routeParams.location;


            //
            if($scope.location){
                console.log("I am here", $routeParams.restname, " ", $routeParams.location);
                search($routeParams.restname, $routeParams.location);



            }

            //Implement event handler
            function search(restname, location){
                //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
                console.log("1")
                YelpService.findRestbyNameLocation(
                    restname,
                    location,
                    function(response){
                        console.log("2")
                        console.log(response);
                        $scope.data = response;
                        $scope.$apply();
                    }
                )
            }
        }

})();