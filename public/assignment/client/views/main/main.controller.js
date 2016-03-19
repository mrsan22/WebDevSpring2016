"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location){
        var vm = this;

        function init(){
            vm.$location = $location;
        }
        init();

    }
})();