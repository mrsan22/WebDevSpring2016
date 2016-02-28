"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        // Declaration of Interface
        var userServiceApi = {
            setCurrentUser : setCurrentUser,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return userServiceApi;

        //Implementation of Interfaces
        function setCurrentUser (user) {
            $rootScope.user = user;
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

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user, callback){
            user["_id"] = (new Date).getTime();
            users.push(user);
            callback(user);
            //console.log(users)
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
                    users[each] = user;
                    callback(users[each]);
                }
            }

        }



    }

})();