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

        //function findAllUsers(callback){
        //    callback(users);
        //}
        //
        function createUser(user){
            return $http.post("/api/assignment/register", user);
        }

        //function deleteUserById(userId, callback){
        //    var each = "";
        //    for (each in users){
        //        if (users[each]._id == userId){
        //            users.splice(each,1);
        //        }
        //    }
        //    callback(users);
        //}
        //
        //function updateUser(userId, user, callback){
        //    var each = "";
        //    for (each in users){
        //        if (users[each]._id == userId){
        //            users[each] = user;
        //            callback(users[each]);
        //        }
        //    }
        //
        //}



    }

})();