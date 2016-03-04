"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;
        vm.update = update;

        function init() {
            vm.currentUser = UserService.getCurrentUser();
            if(vm.currentUser == null) {
                $location.url("/home");
            }

            if(vm.currentUser != undefined){
                vm.readonly = true;
            }
        }
        init();

        function update(user){
            UserService.updateUser(
                user._id,
                user,
                function(user){
                    console.log(user)
                }
            )
        }

    }
})();