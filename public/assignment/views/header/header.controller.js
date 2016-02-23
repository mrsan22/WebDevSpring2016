"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location,$rootScope){

        $scope.logOut = logOut;

        function logOut(){
            delete $rootScope.user;
            $location.url('/home')

        }
    }
})();