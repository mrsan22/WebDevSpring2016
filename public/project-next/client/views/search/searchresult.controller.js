"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("SearchController", searchController);

        function searchController($scope, $routeParams, YelpService){
            $scope.restname = $routeParams.restname;
            $scope.location = $routeParams.location;
            $scope.previousPage = previousPage;
            $scope.nextPage = nextPage;
            $scope.endIndex = 10;
            $scope.startIndex = -10;
            $scope.hideButton = true;

            //
            if($scope.location){
                console.log("I am here", $routeParams.restname, " ", $routeParams.location);
                search($routeParams.restname, $routeParams.location);



            }

            //Implement event handler
            function search(restname, location){
                //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
                YelpService.findRestbyNameLocation(
                    restname,
                    location,
                    function(response){
                        if(response.businesses.length == 0 || response.total == 0){
                            $scope.showWarningMsg = true;
                            $scope.hideButton = true
                        }
                        console.log(response);
                        $scope.totalResponse = response.businesses.length;
                        $scope.data = response;
                        if ($scope.totalResponse > 0) {
                            $scope.showNext = true;
                            $scope.showPrevious = false;
                            $scope.hideButton = false;
                        }
                        $scope.$apply();
                    }
                )
            }

            function nextPage () {
                console.log($scope.endIndex, $scope.totalResponse);
                if ($scope.endIndex < $scope.totalResponse)
                    $scope.endIndex = $scope.endIndex + 10;
                if ($scope.endIndex > 10)
                    $scope.showPrevious = true;

                if ($scope.endIndex >= $scope.totalResponse && ($scope.totalResponse - $scope.endIndex) < 10) {
                    $scope.startIndex = 0 - ($scope.totalResponse - $scope.endIndex + 10);
                    $scope.showNext = false;
                }
                else {
                    $scope.startIndex = -10
                }
            }

            function previousPage () {
                $scope.startIndex = -10;
                $scope.showNext = true;
                if ($scope.endIndex > 10) {
                    $scope.endIndex = $scope.endIndex - 10;
                    if ($scope.endIndex <= 10)
                        $scope.showPrevious = false;
                }
            }
        }

})();