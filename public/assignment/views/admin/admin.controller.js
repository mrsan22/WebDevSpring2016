"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location){
        $scope.user = $rootScope.user;
        if (!$scope.user) {
            $location.url("/home");
        }
    }
})();