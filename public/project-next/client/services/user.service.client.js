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
            createAndFindAllUsers : createAndFindAllUsers,
            deleteUserById : deleteUserById,
            updateUserById : updateUserById,
            updateUserByIdNoSession: updateUserByIdNoSession,
            logOut : logOut,
            addLike: addLike,
            isLiked: isLiked,
            unLike: unLike
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

        function updateUserByIdNoSession(userId, user){
            return $http.put("/api/project/userupdate/"+userId, user);
        }

        function logOut(){
            return $http.post("/api/project/logout");
        }

        function createAndFindAllUsers(user){
            return $http.post("/api/project/admin-user", user);
        }

        function addLike(restId, userId){
            return $http.put("/api/project/user/"+userId+"/rest/"+restId+"/like");
        }

        function isLiked(restId, userId){
            return $http.get("/api/project/user/"+userId+"/rest/"+restId+"/isLiked");
        }

        function unLike(restId, userId){
            return $http.delete("/api/project/user/"+userId+"/rest/"+restId+"/unLike");
        }

    }

})();