(function(){
    angular
        .module("angularApp")
        .controller("CourseListController", courseListController);

    function courseListController($scope){
        $scope.hello = "Hello from CourseListController";
    }
})();