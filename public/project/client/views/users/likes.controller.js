(function () {
    angular
        .module("Eat'n'Review")
        .controller("LikesController", likeController);

    function likeController(UserService, $routeParams, RestService, $location){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.likeRest = likeRest;
        vm.undolikeRest=undolikeRest;
        vm.$location = $location;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                        getLikesforUser();
                        isFollowed();
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
            //$scope.$apply();
        }

        function getLikesforUser(){
            UserService
                .findUserById(vm.currentUser._id)
                .then(function (currentUser) {
                    vm.currentUser  = currentUser.data;
                    return UserService.getLikesforUser(vm.userId);
                }, function (error) {
                    console.log("Error in finding current user By Id", error.statusText);
                })
                .then(function (restaurants) {
                    if (restaurants.data.length == 0){
                        vm.noLikedRest = true
                    }
                    vm.restaurants = restaurants.data;
                    if(vm.currentUser){
                        restaurants.data.forEach(function (element, index, arr) {
                            if(vm.currentUser.likes.indexOf(element._id)> -1){
                                element.isLiked = true;
                            }
                            else{
                                element.isLiked = false;
                            }
                        })
                    }

                }, function (error) {
                    console.log("Error in getting likes for the routeparams user", error.statusText);
                })
        }

        function likeRest(rest){
            UserService
                .addLike(rest._id, vm.currentUser._id)
                .then(function (response) {
                    if(response.status == 200){
                        rest.isLiked = true;
                        //RestService.addRest(vm.rest);
                    }
                }, function (error) {
                    console.log("Error in adding like for a Restaurant", error.statusText);
                })
        }

        function undolikeRest(rest){
            UserService
                .unLike(rest._id, vm.currentUser._id)
                .then(function (response) {
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        rest.isLiked = false;
                    }
                }, function (error) {
                    console.log("Error in removing like for a Restaurant", error.statusText);
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