(function(){
    angular
        .module("angularApp")
        .controller("CourseOverViewController", courseOverViewController);

    function courseOverViewController($scope){
        $scope.hello = "Hello from CourseOverViewController";
    }
})();