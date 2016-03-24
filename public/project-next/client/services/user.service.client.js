"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        // Declaration of Interface
        var userServiceApi = {
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser,
            loginUser : loginUser,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUserById : updateUserById,
            logOut : logOut
        };

        return userServiceApi;

        //Implementation of Interfaces
        function getCurrentUser(){
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(credentials){
            // Sending a post request to user service on the server. This returns a promise to whoever calls it.
            return $http.post('/api/project/login', credentials);
        }


        function loginUser(username, password){
            console.log(username, password);
            return $http.get('/api/project/user?username='+username+'&password='+password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function findUserById(userid){
            return $http.get("/api/project/user/" + userid);
        }

        function findUserByUsername(username){
            return $http.get('/api/project/user?username='+username);
        }

        function createUser(user){
            return $http.post("/api/project/register", user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function updateUserById(userId, user){
            return $http.put("/api/project/user/"+userId, user);

        }

        function logOut(){
            return $http.post("/api/project/logout");
        }


    }

})();