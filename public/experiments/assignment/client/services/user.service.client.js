"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        // Declaration of Interface
        var userServiceApi = {
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            deleteUserById : deleteUserById,
            updateUserById : updateUserById,
            logOut : logOut
        };

        return userServiceApi;

        //Implementation of Interfaces
        function getCurrentUser(){
            //return $rootScope.currentUser;
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
            //console.log($rootScope.currentUser);
        }
        function findUserByCredentials(credentials){
            console.log(credentials);
            // Sending a post request to user service on the server. This returns a promise to login controller.
            return $http.post('/api/assignment/login', credentials);
        }

        function findUserByUsername(username){
            return $http.post('/api/assignment/user', username);
        }

        function logOut(){
            return $http.post("/api/assignment/logout");
        }

        function findAllUsers(){
            return $http.get("/api/assignment/users");
        }

        function createUser(user){
            return $http.post("/api/assignment/register", user);
        }

        function findUserById(userid){
            return $http.post("/api/assignment/userById", userid);
        }

        function deleteUserById(userId){
            return $http.post("/api/assignment/deleteuser", userId);
        }

        function updateUserById(userId, user){
            var params = {
                userId : userId,
                user : user
            };
            console.log(params);
            return $http.post("/api/assignment/updateuser", params);

        }



    }

})();