"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html",
                controller : "HomeController",
                controllerAs : "homeControllerModel",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/searchhome", {
                templateUrl: "views/search/searchhome.view.html",
                controller: "SearchHomeController",
                controllerAs: "searchControllerModel",
                resolve : {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl : "views/users/register.view.html",
                controller : "RegisterController",
                controllerAs : "registerControllerModel"
            })
            .when("/login", {
                templateUrl : "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "loginControllerModel"
            })
            .when("/forgotpassword", {
                templateUrl : "views/users/forgotpassword.view.html",
                controller : "ForgotPasswordController",
                controllerAs: "forgotPassModel"
            })
            .when("/:userId/profile", {
                templateUrl : "views/users/profile.view.html",
                controller : "ProfileController",
                controllerAs: "profileControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/:userId/profile/likes", {
                templateUrl : "views/users/likes.view.html",
                controller : "LikesController",
                controllerAs: "likeControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/:userId/profile/followers", {
                templateUrl : "views/users/followers.view.html",
                controller : "FollowersController",
                controllerAs: "followersControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/:userId/profile/following", {
                templateUrl : "views/users/following.view.html",
                controller : "FollowingController",
                controllerAs: "followingControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/:userId/view/profile", {
                templateUrl : "views/users/userInfo.view.html",
                controller : "UserInfoController",
                controllerAs: "UserInfoControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/:userId/profile/reviews", {
                templateUrl : "views/users/reviews.view.html",
                controller : "ReviewController",
                controllerAs:"reviewsControllerModel",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin/user", {
                templateUrl : "views/admin/admin.user.view.html",
                controller : "AdminController",
                controllerAs : "adminUserModel",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/search", {
                templateUrl : "views/search/searchresult.view.html",
                controller : "SearchController"

            })
            .when("/search/restname=:restname&location=:location", {
                templateUrl : "views/search/searchresult.view.html",
                controller : "SearchController",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/search/location=:location", {
                templateUrl: "views/search/searchresult.view.html",
                controller : "SearchController",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/detail/:restId", {
                templateUrl: "views/search/searchdetails.view.html",
                controller: "DetailController",
                controllerAs: "detailsControllerModel",
                resolve : {
                    getLoggedIn : getLoggedIn
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
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();