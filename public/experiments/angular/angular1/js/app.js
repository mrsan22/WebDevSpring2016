/**
 * Created by skumar on 2/13/16.
 */

(function (){
    angular
        .module("HelloWorldApp", [])//Just like import, include. You can include other array of dependencies in [] // Third party API etc.
        .controller("HelloWorldController", theController);


    function theController($scope){
        $scope.hello = "Hello World from Angular JS";
    }
})();
