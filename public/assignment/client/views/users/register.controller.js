"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm  =this;
        vm.emails = [];
        // Event handler declaration
        vm.register = register;

        function init (){

        }

        init();

        //Implementation of event handler
        function register(userObj) {
            vm.emails.push(userObj.emails);
            userObj.emails = vm.emails;
            console.log(userObj);
            UserService
                .createUser(userObj)
                .then(function (response) {
                    console.log(response);
                   var currentUser = response.data;
                    if(currentUser != null){
                        UserService.setCurrentUser(currentUser);
                        $location.url('/profile');
                    }
                    else{
                        //promise fullfilled, inpsite of getting a null response.
                        console.log("Username already exists");
                        vm.showAlert = true;
                    }
                });
        }
    }
})();