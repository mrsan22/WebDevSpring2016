(function () {
    angular
        .module("Eat'n'Review")
        .controller("ProfileController", profileController);

    function profileController(UserService){
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.update = update;

        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                        vm.currentUser = response.data;
                        if(response.data != undefined){
                            vm.readonly = true;
                        }
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

        function update(user){
            UserService
                .updateUserById(user._id, user)
                .then(function (response) {
                    console.log("User details updated", response.data)
                },
                    function (error) {
                       console.log(error.statusText);
                    });
        }
    }

})();