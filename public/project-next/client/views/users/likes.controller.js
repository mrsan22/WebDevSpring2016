(function () {
    angular
        .module("Eat'n'Review")
        .controller("LikesController", likeController);

    function likeController(UserService, $routeParams, RestService){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.likeRest = likeRest;
        vm.undolikeRest=undolikeRest;

        function init(){
            vm.userId = $routeParams.userId;
            console.log("Id of user",vm.userId);

            UserService.getCurrentUser()
                .then(function(response){
                        console.log(response.data);
                        vm.currentUser = response.data;
                        getLikesforUser();
                    },
                    function (error){
                        console.log(error.statusText)
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
                    console.log(currentUser);
                    vm.currentUser  = currentUser.data;
                    console.log(vm.currentUser);
                    return UserService.getLikesforUser(vm.userId);
                }, function (error) {
                    console.log("Error in finding current user By Id", error.statusText);
                })
                .then(function (restaurants) {
                    console.log(restaurants);
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


    }

})();