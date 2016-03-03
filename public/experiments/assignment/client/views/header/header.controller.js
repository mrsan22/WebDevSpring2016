"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location,$rootScope, UserService){
        $scope.logOut = logOut;
        function logOut(){
            //delete $rootScope.user;
            UserService.setCurrentUser(null);
            $location.url('/home')

        }
    }
})();