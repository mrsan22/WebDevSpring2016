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
            getFollowingDetails();
        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
            //$scope.$apply();
        }

        function getFollowingDetails(){
            UserService
                .getFollowingDetails(vm.userId)
                .then(function (response) {
                    if(response.data){
                        vm.following = response.data;
                    }
                }, function (error) {
                    console.log("Error in getting users currently logged in user is following",error.statusText)
                })
        }


    }

})();