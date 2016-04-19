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
        //var selectedUserIndex = -1;
        vm.predicate = 'username';
        vm.reverse = true;

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

        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };
        function addUser(userObj){
            if (!userObj || !userObj.username || !userObj.password || !userObj.roles){
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

        function selectUser(user){
            //selectedUserIndex = userIndex;
            //var selectUser = {
            //    "_id" : vm.users[userIndex]._id,
            //    "username" : vm.users[userIndex].username,
            //    "password" : vm.users[userIndex].password,
            //    "firstName": vm.users[userIndex].firstName,
            //    "lastName": vm.users[userIndex].lastName,
            //    "roles" : vm.users[userIndex].roles
            //};
            //vm.user = selectUser;
            var editUser = angular.copy(user);
            vm.user = editUser;
        }

        function updateUser(userObj){
            console.log(userObj);
            UserService
                .updateUserById(userObj._id, userObj)
                .then(function (response) {
                    console.log("Response",response.data);
                    if (response.data != null) {
                        return UserService.findAllUsers();
                    }
                    else{
                        alert("Username already exists. Please choose a different username!");
                    }

                }, function (error) {
                    console.log(error.statusText);
                })
                .then(function (users) {
                    if(users){
                        vm.users = users.data;
                        vm.user = {};
                    }
                }, function (error) {
                    console.log("Unable to fetch all users");
                })
        }

        function deleteUser(user){
            UserService
                .deleteUserById(user._id)
                .then(function (response) {
                    vm.users = response.data;

                }, function (error) {
                    console.log(error.statusText);
                });
        }


    }

})();