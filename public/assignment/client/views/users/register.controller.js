"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm  =this;

        // Event handler declaration
        vm.register = register;

        function init (){

        }

        init();

        //Implementation of event handler
        function register(userObj) {
            UserService
                .createUser(userObj)
                .then(function (response) {
                   var currentUser = response.data;
                    if(currentUser != null){
                        UserService.setCurrentUser(currentUser);
                        $location.url('/profile');
                    }
                    else{
                        //promise fullfilled, inpsite of getting a null response.
                        vm.showAlert = true;
                    }
                });
        }
    }
})();