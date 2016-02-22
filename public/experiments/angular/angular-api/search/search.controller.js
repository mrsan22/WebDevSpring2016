(function() {
    angular
        .module("RestApp")
        .controller("SearchController", searchController);

    function searchController($scope, $routeParams, YelpService){
        //Register event handler
        $scope.search = search;
        //$scope.restname = $routeParams.restname;
        //$scope.location = $routeParams.location;

        //Implement event handler
        function search(restname, location){
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    console.log(response);
                    $scope.data = response;
                }
            )
        }
    }
})();