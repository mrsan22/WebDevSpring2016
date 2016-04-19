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
            UserService
                .logOut()
                .then(function (response) {
                    UserService.setCurrentUser(null);
                    $location.url('/home');
                },
                    function (error) {
                        console.log(error.statusText);
                    });

        }
    }
})();