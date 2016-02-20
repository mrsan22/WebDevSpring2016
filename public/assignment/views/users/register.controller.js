"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        // Event handler declaration
        $scope.register = register;

        //Implementation of event handler
        function register(username, password, vpassword, emailId) {
            $rootScope.uname = username;
            $rootScope.pswd = password;
            $rootScope.vpswd = vpassword;
            $rootScope.email = emailId;

            var userObj = {"username" : $rootScope.uname, "password" : $rootScope.pswd,
                "verify password" : $rootScope.vpswd, "email" : $rootScope.email}


            UserService.createUser(
                userObj,
                function(user){
                  console.log(user);
                })
        }
    }
})();