(function () {
    angular
        .module("Eat'n'Review")
        .controller("HomeController",homeController);

    function homeController($scope, $location, $routeParams, $rootScope, YelpService){

        //Register event handler
        $scope.callSearch = callSearch;

        function init(){
            $('#myCarousel').carousel({
                interval: 5000 //changes the speed
            })
        }
        init();
        //Implement event handler
        function callSearch(restname, location){
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    console.log(response);
                    $rootScope.data = response;
                    $location.url('/search/restname='+restname+'&location='+location);
                    $scope.$apply();
                }
            )
        }

    }
})();