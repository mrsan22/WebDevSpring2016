"use strict";
//(function () {
//    angular
//        .module("FormBuilderApp")
//        .controller("LoginController", LoginController);
//
//    function LoginController($scope, $location, $rootScope, UserService){
//        $scope.login = login;
//
//        function login(user){
//            UserService.findUserByCredentials(
//                user.username,
//                user.password,
//                function(user){
//                    $rootScope.user = user;
//                    $location.url('/profile');
//                }
//            )
//        }
//    }
//})();
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService){
        var vm = this;

        vm.login = login;

        //Contains code that we want to executen as soon as the controller loads
        function init(){

        }
        init();

        //Calling the client user service
        function login(user){
            UserService.findUserByCredentials(
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