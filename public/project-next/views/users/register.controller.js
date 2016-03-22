"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {

        // Event handler declaration
        $scope.register = register;

        //Implementation of event handler
        function register(userObj) {
            UserService.createUser(
                userObj,
                // user object comes from the user services as a callback response.
                function(user){
                    console.log(user);
                    $rootScope.user = user;
                    $location.url('/profile');

                })
        }
    }
})();