"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/register", {
                templateUrl : "views/users/register.view.html",
                controller : "RegisterController",
                controllerAs:"model"
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
                controller: "AdminController",
                controllerAs : "model",
                resolve:{
                    checkAdmin: checkAdmin
                }
            })
            .when("/forms", {
                templateUrl : "views/forms/forms.view.html",
                controller : "FormController",
                controllerAs : "model",
                resolve : {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl : "views/forms/field.view.html",
                controller : "FieldController",
                controllerAs : "model",
                resolve : {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q){
        var deferred = $q.defer();
        UserService.
            getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            });
        return deferred.promise;
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
                    $location.url("/login");
                }
            });

        return deferred.promise;
    }

    var checkAdmin = function(UserService, $q, $location)
    {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser && currentUser.roles.indexOf('admin') != -1) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    };

})();