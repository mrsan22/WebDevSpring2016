"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){
        var vm = this;

        vm.login = login;

        //Contains code that we want to execute as soon as the controller loads
        function init(){

        }
        init();

        //Calling the client user service
        function login(user){
            if(!user){
                return;
            }
            UserService
                .loginUser(user.username, user.password)
                //response is a promise returned by the client user service. promise is fullfilled,
                //regardless of the outcome
                .then(function (response) {
                        if(response.data){
                            // Store current user object in rootScope using user client service
                            UserService.setCurrentUser(response.data);
                            $location.url('/profile');
                        }
                        else{
                            //promise fullfilled, inpsite of getting a null response.
                            vm.showAlert = true;
                        }

                    },      //called if promise fails
                    function (error) {
                        //handle error here
                        console.log(error.statusText);
                    });
        }
    }
})();