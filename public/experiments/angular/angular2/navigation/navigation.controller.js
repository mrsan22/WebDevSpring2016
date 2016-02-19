/**
 * Created by skumar on 2/18/16.
 */
(function(){
    angular
        .module("angularApp")
        .controller("NavController", navController);

    function navController($scope, $location){
        $scope.location = $location;
    }

})();