(function(){
    angular
        .module("RestApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            //.when("/search:term=restname&location=location", {
            //    templateUrl: "search/search.view.html",
            //    controller: "SearchController"
            //})
            //.when("/search/:title", {
            //    templateUrl: "search/search.view.html",
            //    controller: "SearchController"
            //})
            .when("/detail/:restId", {
                templateUrl: "search/searchdetails.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();