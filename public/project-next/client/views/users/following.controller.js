(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowingController", followingController);

    function followingController(UserService, $routeParams){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.unFollowUser = unFollowUser;

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
            $("#wrapper").toggleClass("toggled");
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

        function unFollowUser(userId){
            console.log("userid",userId);
            UserService
                .unFollowUser(userId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && response.data.nModified == 1){
                        getFollowingDetails()
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }


    }

})();