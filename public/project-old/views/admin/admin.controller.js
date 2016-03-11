"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("AdminController", adminController);

    function adminController($scope, UserService){
        UserService.findAllUsers(
            function(usersArray){
                $scope.users = usersArray;
            }
        );

        //Event handler declaration
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        var selectedUserIndex = -1;

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
                    $scope.user = {};
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
                        $scope.users[selectedUserIndex] = user;
                        $scope.user = {};
                        selectedUserIndex = -1;
                    }

                }
            )
        }

        function selectUser(userIndex){
            selectedUserIndex = userIndex;
            var selectUser = {
                "_id" : $scope.users[userIndex]._id,
                "username" : $scope.users[userIndex].username,
                "password" : $scope.users[userIndex].password,
                "roles" : $scope.users[userIndex].roles
            };
            $scope.user = selectUser;
        }

        function deleteUser(userIndex){
            UserService.deleteUserById(
                $scope.users[userIndex]._id,
                function(users){
                    UserService.findAllUsers(
                        function(users){
                            $scope.users = users;
                        }
                    )
                }
            )
        }
    }
})();