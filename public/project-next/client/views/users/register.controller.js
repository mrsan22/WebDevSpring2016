"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm =  this;
        // Event handler declaration
        vm.register = register;

        function init(){
            vm.$location = $location;
        }
        init();

        //Implementation of event handler
        //function register(userObj) {
        //    UserService.createUser(
        //        userObj,
        //        // user object comes from the user services as a callback response.
        //        function(user){
        //            console.log(user);
        //            $rootScope.user = user;
        //            vm.$location.url('/profile');
        //
        //        })
        //}
        function register(userObj){
            UserService
                .createUser(userObj)
                .then(function (response) {
                    console.log(response);
                    var currentUser = response.data;
                    if(currentUser != null){
                        UserService.setCurrentUser(currentUser);
                        vm.$location.url('/profile');
                    }
                    else{
                        //promise fullfilled, inpsite of getting a null response.
                    }

                },
                    function (error) {
                        console.log(error.statusText);
                    })
        }
    }
})();