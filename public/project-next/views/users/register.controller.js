"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm =  this;
        // Event handler declaration
        vm.register = register;

        function init(){
            vm.$location = $location;
        }
        init();

        //Implementation of event handler
        function register(userObj) {
            UserService.createUser(
                userObj,
                // user object comes from the user services as a callback response.
                function(user){
                    console.log(user);
                    $rootScope.user = user;
                    vm.$location.url('/profile');

                })
        }
    }
})();