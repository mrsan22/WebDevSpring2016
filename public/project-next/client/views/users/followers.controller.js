(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowersController", followersController);

    function followersController(UserService, $routeParams){
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