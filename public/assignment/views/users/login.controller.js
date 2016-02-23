"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService){
        $scope.login = login;

        function login(user){
            UserService.findUserByUsernameAndPassword(
                user.username,
                user.password,
                function(user){
                    $rootScope.user = user;
                    $location.url('/profile');
                }
            )
        }
    }
})();