(function () {
    angular
        .module("Eat'n'Review")
        .controller("ReviewController", reviewController);

    function reviewController($routeParams, ReviewService, UserService, $location){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        function init(){
            vm.userId = $routeParams.userId;
            vm.$location = $location;

            UserService.getCurrentUser()
                .then(function(response){
                        console.log("loggedin",response.data);
                        vm.currentUser = response.data;
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
                    console.log(error);
                });

            getAllReviewsByUserId();
        }
        init();

        function toggleMenu(){
            //preventDefault();
            $("#wrapper").toggleClass("toggled");
            //$scope.$apply();
        }

        function getAllReviewsByUserId(){
            ReviewService
                .findAllReviewsByUserId(vm.userId)
                .then(function (response) {
                    console.log(response);
                    vm.reviews = response.data;
                    
                }, function (error) {
                    console.log("Error in fetching all reviews by User Id");
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