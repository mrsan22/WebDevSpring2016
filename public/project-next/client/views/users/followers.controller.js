(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowersController", followersController);

    function followersController(UserService, $routeParams){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        //vm.followUser = followUser;
        //vm.unFollowUser = unFollowUser;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                        isFollowed();
                    },
                    function (error){
                        console.log(error.statusText)
                    });
            getFollowersDetails();
        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
        }

        function getFollowersDetails(){
            UserService
                .getFollowersDetails(vm.userId)
                .then(function (response) {
                    console.log(response);
                    if(response.data){
                        vm.followers = response.data;
                    }
                }, function (error) {
                    console.log("Error in getting the followers list of currently loggedin user",error.statusText)
                })
        }


        function followUser(userId){
            console.log(userId);
            UserService
                .followUser(userId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        vm.isfollowed = true;
                    }
                }, function (error) {
                    console.log("Error in following a user", error.statusText);
                })
        }

        //Is user(whose profile currently loggedin user visits) followedby currently loggedin user.
        function isFollowed(){
            UserService
                .isFollowed(vm.userId, vm.currentUser._id)
                .then(function (response) {
                    if(response.data){
                        vm.isfollowed = true;
                    }
                    else{
                        vm.isfollowed = false;
                    }
                }, function (error) {
                    console.log("Error in retrieving restid from likes Array of current User", error.statusText);
                })
        }

        function unFollowUser(userId){
            UserService
                .unFollowUser(userId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && response.data.nModified == 1){
                        vm.isfollowed = false;
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }


    }

})();