(function () {
    angular
        .module("Eat'n'Review")
        .controller("ReviewController", reviewController);

    function reviewController($scope){
        $scope.toggleMenu = toggleMenu;

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
            //$scope.$apply();
        }
    }

})();