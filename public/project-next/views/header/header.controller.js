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
            UserService.setCurrentUser(null);
            vm.$location.url('/home')

        }
    }
})();