"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.location = $location;
    }
})();