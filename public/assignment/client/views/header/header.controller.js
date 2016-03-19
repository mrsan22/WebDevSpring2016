"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){
        var vm = this;

        vm.logOut = logOut;

        function init(){
            vm.$location = $location;
        }
        init();

        function logOut(){
            //delete $rootScope.user;
            //UserService.setCurrentUser(null);
            //$location.url('/home');
            UserService
                .logOut()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url('/home');
                },
                    function (error) {
                        console.log(error.statusText);
                    });

        }
    }
})();