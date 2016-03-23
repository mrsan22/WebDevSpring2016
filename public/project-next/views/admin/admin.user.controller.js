"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("AdminController", adminController);

    function adminController($scope, UserService){
        var vm =this;

        //Event handler declaration
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        var selectedUserIndex = -1;

        //Run this part as soon as controller loads
        function init(){
            vm.roles = [
                {name: "user", value: "user"},
                {name: "admin", value: "admin"}
            ];


            UserService.findAllUsers(
                function(usersArray){
                    vm.users = usersArray;
                }
            );
        }

        init();

        //Implementation of event handler
        function addUser(userObj){
            if (!userObj || !userObj.username || !userObj.password || !userObj.roles){
                alert("Some field is missing value");
                return;
            }
            UserService.createUser(
                userObj,
                function(user){
                    console.log("New user added",user);
                    vm.user = {};
                }
            )
        }

        function updateUser(userObj){
            if(!userObj || !userObj.username || !userObj.password || !userObj.roles){
                alert("Some field is missing value");
                return;
            }
            UserService.updateUser(
                userObj._id,
                userObj,
                function(user){
                    if (selectedUserIndex >= 0) {
                        vm.users[selectedUserIndex] = user;
                        vm.user = {};
                        selectedUserIndex = -1;
                    }

                }
            )
        }

        function selectUser(userIndex){
            selectedUserIndex = userIndex;
            var selectUser = {
                "_id" : vm.users[userIndex]._id,
                "username" : vm.users[userIndex].username,
                "password" : vm.users[userIndex].password,
                "roles" : vm.users[userIndex].roles
            };
            vm.user = selectUser;
        }

        function deleteUser(userIndex){
            UserService.deleteUserById(
                vm.users[userIndex]._id,
                function(users){
                    UserService.findAllUsers(
                        function(users){
                            vm.users = users;
                        }
                    )
                }
            )
        }
    }
})();