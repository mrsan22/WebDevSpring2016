"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService){
        $scope.callToSearch = callToSearch;
        $scope.logOut = logOut;

        //Implement event handler
        function callToSearch(restname, location){
            if(!restname){
                $location.url('/search/location='+location);
            }
            else{
            $location.url('/search/restname='+restname+'&location='+location);
            }


        }

        function logOut(){
            //delete $rootScope.user;
            UserService.setCurrentUser(null);
            $location.url('/home')

        }
    }
})();