"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){
        var vm =this;

        //Declare Event handler
        vm.callToSearch = callToSearch;
        vm.logOut = logOut;
        vm.toggleMenu = toggleMenu;


        function init(){
            vm.$location = $location;
        }
        init();
        //Implement event handler
        function callToSearch(restname, location){
            if(!restname){
                vm.$location.url('/search/location='+location);
            }
            else{
            vm.$location.url('/search/restname='+restname+'&location='+location);
            }


        }

        function logOut(){
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

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }
    }
})();