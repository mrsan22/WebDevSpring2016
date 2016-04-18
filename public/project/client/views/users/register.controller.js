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
            if(!validateUser(userObj)){
                vm.showGenralError = true;
                return;
            }
            vm.showGenralError=false;
            UserService
                .createUser(userObj)
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser != null){
                        vm.showError = false;
                        UserService.setCurrentUser(currentUser);
                        //vm.$location.url('/currentUser._id/profile');
                        vm.$location.url('/searchhome');
                    }
                    else{
                        //promise fullfilled, inpsite of getting a null response.
                        vm.showError = true;
                    }

                },
                    function (error) {
                        console.log(error.statusText);
                    })
        }

        function validateUser(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
                flag = flag && user.firstName;
                flag = flag && user.lastName;
                flag = flag && user.email;

                if (user.password == user.vpassword)
                    flag = flag && true;
                else
                    flag = flag && false;
            }
            else {
                flag = flag && false;
            }

            return flag;
        }
    }
})();