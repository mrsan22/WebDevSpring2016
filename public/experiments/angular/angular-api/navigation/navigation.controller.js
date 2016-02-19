(function(){
    angular
        .module("RestApp")
        .controller("NavController", navController);

    function navController($scope, $location) {
        $scope.$location = $location;
    }
})();