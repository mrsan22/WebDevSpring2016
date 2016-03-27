"use strict";
(function(){
    angular
        .module("Eat'n'Review")
        .controller("MainController", MainController);

    function MainController($location){
        var vm =this;
        vm.location = $location;
    }
})();