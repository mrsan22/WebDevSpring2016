(function(){
    angular
        .module("angularApp")
        .controller("HomeController", HomeController);

    function HomeController($scope){
        $scope.hello = "Hello from HomeController";
    }
})();