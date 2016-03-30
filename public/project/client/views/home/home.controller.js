(function () {
    angular
        .module("Eat'n'Review")
        .controller("HomeController",homeController);

    function homeController($scope, $location, YelpService){
        var vm = this;

        //Register event handler
        vm.callSearch = callSearch;

        //Contains code that we want to execute as soon as the controller loads
        function init(){
            $('#myCarousel').carousel({
                interval: 5000 //changes the speed
            });
            //var input = document.getElementById('loc');
            //var autocomplete = new google.maps.places.Autocomplete(input);
        }
        init();

        //Implement event handler
        function callSearch(restname, location){
            console.log(location);
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    vm.data = response;
                    $location.url('/search/restname='+restname+'&location='+location);
                    $scope.$apply();
                }
            )
        }

    }
})();