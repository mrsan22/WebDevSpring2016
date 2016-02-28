(function () {
    angular
        .module("Eat'n'Review")
        .controller("HomeController",homeController);

    function homeController($scope, $location, $routeParams, $rootScope, YelpService){
        //$scope.myInterval = 3000;
        //$scope.slides = [
        //    {
        //        image: 'http://lorempixel.com/1500/800/food/2/'
        //    },
        //    {
        //        image: 'http://lorempixel.com/1500/800/food/3/'
        //    },
        //    {
        //        image: 'http://lorempixel.com/1500/800/food/4/'
        //    },
        //    {
        //        image: 'http://lorempixel.com/1500/800/food/5/'
        //    }
        //];

        //Register event handler
        $scope.callSearch = callSearch;

        //Implement event handler
        function callSearch(restname, location){
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    console.log(response);
                    $rootScope.data = response;
                    $location.url('/search/restname='+restname+'&location='+location);
                }
            )
        }

    }
})();