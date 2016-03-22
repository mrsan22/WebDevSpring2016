"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService){
        $scope.login = login;

        function login(user){
            UserService.findUserByCredentials(
                user.username,
                user.password,
                function(user){
                    $rootScope.user = user;
                    $location.url('/home');
                }
            )
        }
    }
})();