(function () {
    angular
        .module("Eat'n'Review")
        .controller("ReviewController", reviewController);

    function reviewController(){
        var vm = this;
        vm.toggleMenu = toggleMenu;

        function init(){

        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
            //$scope.$apply();
        }
    }

})();