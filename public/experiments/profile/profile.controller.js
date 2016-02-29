(function () {
    angular
        .module("Eat'n'Review")
        .controller("ProfileController", profileController);

    function profileController($scope){
        $scope.toggleMenu = toggleMenu;

       function toggleMenu(){
           //preventDefault();
           $("#wrapper").toggleClass("toggled");
           //$scope.$apply();
       }
    }

})();