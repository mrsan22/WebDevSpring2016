/**
 * Created by skumar on 2/18/16.
 */
(function(){
    angular
        .module("angularApp")
        .config(configuration);

    function configuration ($routeProvider){
    $routeProvider
        .when("/home", {
        templateUrl : "home/home.view.html",
        controller : "HomeController"
        })
        .when("/courselist",{
            templateUrl : "courseList/courseList.view.html",
            controller : "CourseListController"
        })
        .when("/courseoverview",{
            templateUrl : "courseOverview/courseoverview.view.html",
            controller : "CourseOverViewController"
        })
        .otherwise({
            redirectTo: "/home"
        });
    }
})();