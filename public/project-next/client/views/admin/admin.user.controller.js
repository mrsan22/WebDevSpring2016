"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("AdminController", adminController);

    function adminController(UserService){
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
                {name: "User", value: "User"},
                {name: "Admin", value: "Admin"}
            ];
            UserService
                .findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        init();

        //Implementation of event handler
        function addUser(userObj){
            if (!userObj || !userObj.username || !userObj.password || !userObj.role){
                alert("Some field is missing value");
                return;
            }
            UserService
                .createAndFindAllUsers(userObj)
                .then(function (response) {
                    console.log("New user added",response.data);
                    if (response.data != null) {
                        vm.users = response.data;
                        vm.user = {};
                    }
                    else{
                        alert("Username already exists!");
                    }

                }, function (error) {
                   console.log(error.statusText);
                });
        }

        function updateUser(userObj){
            console.log(userObj);
            if(!userObj || !userObj.username || !userObj.password || !userObj.role){
                alert("Some field is missing value");
                return;
            }
            UserService
                .updateUserByIdNoSession(userObj._id, userObj)
                .then(function (response) {
                    console.log("Response",response.data);
                    if (selectedUserIndex >= 0 && response.data != null) {
                        vm.users[selectedUserIndex] = response.data;
                        vm.user = {};
                        selectedUserIndex = -1;
                    }
                    else{
                        alert("Username already exists. Please choose a different username!");
                    }

                }, function (error) {
                    console.log(error.statusText);
                });
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
            UserService
                .deleteUserById(vm.users[userIndex]._id)
                .then(function (response) {
                    vm.users = response.data;

                }, function (error) {
                    console.log(error.statusText);
                });
        }
    }
})();