(function () {
    angular
        .module("Eat'n'Review")
        .controller("ProfileController", profileController);

    function profileController($scope){
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