"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService,$rootScope){
        var vm = this;
        vm.login = login;

        function init(){
            vm.$location = $location;
        }
        init();

        function login(user){
            UserService.findUserByCredentials(
                user.username,
                user.password,
                function(user){
                    $rootScope.user = user;
                    vm.$location.url('/searchhome');
                }
            )
        }
    }
})();