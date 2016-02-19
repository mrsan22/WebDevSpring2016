(function() {
    angular
        .module("RestApp")
        .controller("SearchController", searchController);

    function searchController($scope){
        //Register event handler
        $scope.search = search;

        //Implement event handler
        function search(restname, location){

        }
    }
})();