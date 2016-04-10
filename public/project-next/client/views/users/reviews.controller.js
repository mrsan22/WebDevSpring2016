(function () {
    angular
        .module("Eat'n'Review")
        .controller("ReviewController", reviewController);

    function reviewController($routeParams, ReviewService){
        var vm = this;
        vm.toggleMenu = toggleMenu;

        function init(){
            vm.userId = $routeParams.userId;
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