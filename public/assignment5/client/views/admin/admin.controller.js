"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var vm =this;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        var selectedUserIndex = -1;


        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                        vm.currentUser = response.data;
                    },
                    function (error){
                        console.log(error.statusText)
                    });

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

        function addUser(userObj){
            if (!userObj || !userObj.username || !userObj.password || !userObj.roles
                || !userObj.firstName || !userObj.lastName){
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

        function selectUser(userIndex){
            selectedUserIndex = userIndex;
            var selectUser = {
                "_id" : vm.users[userIndex]._id,
                "username" : vm.users[userIndex].username,
                "password" : vm.users[userIndex].password,
                "firstName": vm.users[userIndex].firstName,
                "lastName": vm.users[userIndex].lastName,
                "roles" : vm.users[userIndex].roles
            };
            vm.user = selectUser;
        }

        function updateUser(userObj){
            console.log(userObj);
            UserService
                .updateUserById(userObj._id, userObj)
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