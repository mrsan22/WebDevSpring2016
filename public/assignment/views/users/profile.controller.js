"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        $scope.user = $rootScope.user;
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