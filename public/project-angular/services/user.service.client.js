"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .factory("UserService", UserService);

    function UserService($rootScope){
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
            var id = (new Date).getTime();
            var newUser = {
                "_id" : id,
                "username" : user.username,
                "password" : user.password,
                "roles" : user.roles
            };

            users.push(newUser);
            callback(newUser);
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
            console.log(userId, user);
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
                    console.log(users[each]);
                    callback(users[each]);
                    return;
                }
            }

        }



    }

})();