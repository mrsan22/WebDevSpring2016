"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService,$rootScope){
        var vm = this;
        vm.login = login;

        function init(){
            //vm.$location = $location;
        }
        init();

        //function login(user){
        //    UserService.findUserByCredentials(
        //        user.username,
        //        user.password,
        //        function(user){
        //            $rootScope.user = user;
        //            vm.$location.url('/searchhome');
        //        }
        //    )
        //}
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
                        $location.url('/searchhome');
                    }
                    else{
                        //promise fullfilled, inpsite of getting a null response.
                        //vm.showAlert = true;
                    }
                },  //called if promise fails
                    function (error) {
                        console.log(error.statusText);
                    });
        }
    }
})();