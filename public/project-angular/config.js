"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl : "views/users/register.view.html"
            })
            .when("/login", {
                templateUrl : "views/users/login.view.html"
            })
            .when("/forgotpassword", {
                templateUrl : "views/users/forgotpassword.view.html"
            })
            .when("/profile", {
                templateUrl : "views/users/profile.view.html"
            })
            .when("/admin", {
                templateUrl : "views/admin/admin.view.html"
            })
            .when("/search", {
                templateUrl : "views/search/search.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();