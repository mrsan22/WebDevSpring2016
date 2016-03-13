"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var vm =this;
        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                        vm.currentUser = response.data;
                    },
                    function (error){
                        console.log(error.statusText)
                    });
        }
        init();
    }

})();