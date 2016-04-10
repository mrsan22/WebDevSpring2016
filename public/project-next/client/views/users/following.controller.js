(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowingController", followingController);

    function followingController(UserService, $routeParams){
        var vm = this;
        vm.toggleMenu = toggleMenu;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                    },
                    function (error){
                        console.log(error.statusText)
                    });
        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
            //$scope.$apply();
        }


    }

})();