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
                templateUrl : "views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/login", {
                templateUrl : "views/users/login.view.html",
                controller : "LoginController"
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
            .when("/search/restname=:restname&location=:location", {
                templateUrl : "views/search/search.view.html"

            })
            .when("/search/location=:location", {
                templateUrl: "views/search/search.view.html"
            })
            .when("/detail/:restId", {
                templateUrl: "views/search/searchdetails.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();