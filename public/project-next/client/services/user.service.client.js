"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": "user"		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": "admin"		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": "user"		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": "admin"},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": "user"		}
        ];

        // Declaration of Interface
        var userServiceApi = {
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser,
            loginUser : loginUser,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
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

        function findUserByCredentials(username, password, callback){
            var each = "";
            for (each in users){
                if(users[each].username == username && users[each].password == password){
                    //console.log(users[each]);
                    callback(users[each]);
                    return;
                }
                else{
                    callback(null);
                }
            }
        }

        function loginUser(username, password){
            console.log(username, password);
            return $http.get('/api/project/user?username='+username+'&password='+password);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function findUserById(userid){
            for(var u in users){
                if(users[u]._id == userid){
                    return users[u];
                }
            }
            // user not found
            console.log("user not found by Id, returning null");
            return null;
        }

        function createUser(user){
            return $http.post("/api/project/register", user);
        }

        function deleteUserById(userId, callback){
            var each = "";
            for (each in users){
                if (users[each]._id == userId){
                    users.splice(each,1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback){
            var each = "";
            for (each in users){
                if (users[each]._id == userId){
                    var newUser = {
                        "_id" : user["_id"],
                        "username" : user["username"],
                        "password" : user["password"],
                        "roles" : user["roles"]
                    };
                    users[each] = newUser;
                    callback(users[each]);
                    return;
                }
            }

        }

        function logOut(){
            return $http.post("/api/project/logout");
        }



    }

})();