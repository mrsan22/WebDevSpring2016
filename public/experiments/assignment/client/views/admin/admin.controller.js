"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        //$scope.user = $rootScope.user;
        //if (!$scope.user) {
        //    $location.url("/home");
        //}

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