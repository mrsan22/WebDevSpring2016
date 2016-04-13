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
            loginUser : loginUser,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            createAndFindAllUsers : createAndFindAllUsers,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            getUserById: getUserById,
            deleteUserById : deleteUserById,
            updateUserById : updateUserById,
            logOut : logOut
        };

        return userServiceApi;

        //Implementation of Interfaces
        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }
        function findUserByCredentials(credentials){
            console.log(credentials);
            // Sending a post request to user service on the server. This returns a promise to login controller.
            return $http.post('/api/assignment/login', credentials);
        }

        function loginUser(username, password){
            return $http.post('/api/assignment/user?username='+username+'&password='+password);
        }

        function findUserByUsername(username){
            return $http.post('/api/assignment/user?username='+username);
        }

        function logOut(){
            return $http.post("/api/assignment/logout");
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/register", user);
        }

        function createAndFindAllUsers(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function findUserById(userid){
            return $http.get("/api/assignment/user/" + userid);
        }

        function getUserById(userid){
            return $http.get("/api/assignment/admin/user/" + userid);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUserById(userId, user){
            return $http.put("/api/assignment/admin/user/"+userId, user);

        }



    }

})();