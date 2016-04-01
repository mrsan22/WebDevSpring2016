"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.currentUser = response.data;
                        if (response.data != undefined) {
                            vm.readonly = true;
                        }
                    },
                    function (error) {
                        console.log(error.statusText)
                    });
        }

        init();

        function update(user) {
            UserService
                .updateUserById(user._id, user)
                .then(function (response) {
                    },
                    function (error) {
                        console.log(error.statusText);
                    });

        }

    }
})();