"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var vm =this;
        //vm.addUser = addUser;
        //vm.updateUser = updateUser;
        //vm.selectUser = selectUser;
        //vm.deleteUser = deleteUser;
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
    }

})();