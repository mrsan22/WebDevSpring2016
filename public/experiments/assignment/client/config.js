"use strict";
(function(){
    angular
        .module("FormBuilderApp")
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
                controller : "LoginController",
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl : "views/users/profile.view.html",
                controller : "ProfileController",
                controllerAs:"model",
                //Resolve can be a map of dependencies
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl : "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl : "views/forms/forms.view.html",
                controller : "FormController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();