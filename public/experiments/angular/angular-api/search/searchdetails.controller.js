"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams){
        $scope.restId = $routeParams.restId;
    }
})();