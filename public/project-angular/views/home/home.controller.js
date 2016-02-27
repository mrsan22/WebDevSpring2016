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
        $scope.search = search;


        //if(($scope.restname || !$scope.restname) && $scope.location){
        //    search($scope.restname, $scope.location);
        //}

        //Implement event handler
        function search(restname, location){
            console.log(restname, location);
            //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    console.log(response);
                    $rootScope.data = response;
                    //console.log("Data", data);
                    $location.url('/search');
                }
            )
        }

    }
})();