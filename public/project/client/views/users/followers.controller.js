(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowersController", followersController);

    function followersController(UserService, $routeParams, $location){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.$location = $location;
        vm.followUser1 = followUser1;
        vm.unFollowUser1 = unFollowUser1;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                        getFollowersDetails();
                        isFollowed1();
                    },
                    function (error){
                        console.log(error.statusText)
                    });
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    console.log("Profile is of:", response.data);
                    if(response.data){
                        vm.profileUser = response.data;
                    }
                }, function (error) {

                });
        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
        }

        function getFollowersDetails(){
            UserService
                .findUserById(vm.currentUser._id)
                .then(function (currentUser) {
                    vm.currentUser  = currentUser.data;
                    return UserService.getFollowersDetails(vm.userId);
                }, function (error) {
                    console.log("Error in finding current user By Id", error.statusText);
                })
                .then(function (response) {
                    if(response.data.length == 0){
                        vm.noFollowers = true;
                    }
                    vm.followers = response.data;
                    if(vm.currentUser){
                        response.data.forEach(function (element, index, arr) {
                            if(element._id != vm.currentUser._id) {
                                if (vm.currentUser.following.indexOf(element._id) > -1) {
                                    element.isFollowed = true;
                                }
                                else {
                                    element.isFollowed = false;
                                }
                            }
                            else{
                                element.itsMe = true;
                            }
                        })
                    }

                }, function (error) {
                    console.log("Error in getting likes for the routeparams user", error.statusText);
                })
        }

        function followUser(user){
            console.log(user);
            UserService
                .followUser(user._id, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        user.isFollowed = true;
                    }
                }, function (error) {
                    console.log("Error in following a user", error.statusText);
                })
        }

        function unFollowUser(user){
            UserService
                .unFollowUser(user._id, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        user.isFollowed = false;
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }


        function followUser1(userId){
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
        function isFollowed1(){
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

        function unFollowUser1(userId){
            UserService
                .unFollowUser(userId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        vm.isfollowed = false;
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }




    }

})();