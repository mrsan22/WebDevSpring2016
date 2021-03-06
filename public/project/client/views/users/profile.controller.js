(function () {
    angular
        .module("Eat'n'Review")
        .controller("ProfileController", profileController);

    function profileController(UserService, $routeParams, $location){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.update = update;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.$location = $location;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                        vm.currentUser = response.data;
                        isFollowed();
                        vm.updateProfile = "/api/project/user/"+vm.currentUser._id;
                        if(response.data != undefined){
                            vm.readonly = true;
                        }
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

        function update(user){
            UserService
                .updateUserById(user._id, user)
                .then(function (response) {
                    console.log("User details updated", response.data)
                    vm.currentUser = response.data;
                },
                    function (error) {
                       console.log(error.statusText);
                    });
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
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        vm.isfollowed = false;
                    }
                }, function (error) {
                    console.log("Error in unFollowing a user", error.statusText);
                })
        }


    }

})();