"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService){
        $scope.user = $rootScope.user;
        if (!$scope.user) {
            $location.url("/home");
        }
        //console.log($scope.user);
        if($rootScope.user != undefined){
            $scope.readonly = true;
        }

        $scope.update = update;

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