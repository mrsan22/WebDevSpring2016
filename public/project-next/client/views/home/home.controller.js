(function () {
    angular
        .module("Eat'n'Review")
        .controller("HomeController",homeController);

    function homeController($scope, $location, YelpService, GoogleService){
        var vm = this;

        //Register event handler
        vm.callSearch = callSearch;
        vm.getLocation = getLocation;
        vm.showPosition = showPosition;
        vm.showError = showError;

        //Contains code that we want to execute as soon as the controller loads
        function init(){
            $('#myCarousel').carousel({
                interval: 5000 //changes the speed
            });
        }
        init();

        //Implement event handler
        function callSearch(restname, location){
            if(!location || location == null){
                vm.showLocationWarning = true;
                return;
            }
            if(typeof location != 'string'){
                YelpService.findRestbyNameLocation(
                    restname,
                    location.formatted_address,
                    function(response){
                        vm.data = response;
                        $location.url('/search/restname='+restname+'&location='+location.formatted_address);
                        $scope.$apply();
                    }
                )
            }
            else{
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

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                console.log("Geolocation is not supported by this browser.");

            }
        }

        function showPosition(position){
            console.log("Latitude:" + position.coords.latitude+"<br>Longitude: " + position.coords.longitude);
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            GoogleService
                .findAddressByLatLong(latlon)
                .then(function (place) {
                    console.log(place);
                    console.log(place.data.results[0].formatted_address);
                    vm.loc = place.data.results[0].formatted_address;
                },
                    function (error) {
                        console.log("Failed to retrieve place name, given the lat&long", error);
                    })

        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
        }

    }
})();