(function () {
    angular
        .module("Eat'n'Review")
        .controller("ReviewController", reviewController);

    function reviewController($routeParams, ReviewService, UserService, $location){
        var vm = this;
        vm.toggleMenu = toggleMenu;

        function init(){
            vm.userId = $routeParams.userId;
            vm.$location = $location;

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

    }

})();