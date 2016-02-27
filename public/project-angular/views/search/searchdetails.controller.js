"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService){
        $scope.restId = $routeParams.restId;

        YelpService.findRestDetailsbyId(
            $scope.restId,
            function(response){
                console.log(response);
                $scope.rest = response;
                $scope.$apply();
            }
        )
    }
})();