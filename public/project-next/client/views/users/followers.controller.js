(function () {
    angular
        .module("Eat'n'Review")
        .controller("FollowersController", followersController);

    function followersController(UserService, $routeParams){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                        getFollowersDetails();
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
                    console.log(vm.currentUser);
                    return UserService.getFollowersDetails(vm.userId);
                }, function (error) {
                    console.log("Error in finding current user By Id", error.statusText);
                })
                .then(function (response) {
                    console.log(response);
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
                    if(response.status == 200 && response.data.nModified == 1){
                        user.isFollowed = false;
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }






    }

})();