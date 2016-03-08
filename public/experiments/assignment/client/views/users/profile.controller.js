"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;
        vm.update = update;

        function init() {
            //vm.currentUser = UserService.getCurrentUser();
            //console.log(vm.currentUser);
            //if(vm.currentUser == null) {
            //    $location.url("/home");
            //}
            UserService.getCurrentUser()
                .then(function(response){
                    vm.currentUser = response.data;
                    if(response.data != undefined){
                        vm.readonly = true;
                    }
                },
                function (error){
                    console.log(error.statusText)
                });
        }
        init();

        function update(user){
            console.log(user);
            UserService
                .updateUserById(user._id,user)
                .then(function (response) {
                    //vm.currentUser  =response.data;
                    //console.log(response.data);
                },
                    function (error) {
                        console.log(error.statusText);
                    });

        }

    }
})();