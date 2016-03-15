"use strict";
(function () {
        angular
            .module("FormBuilderApp")
            .controller("FieldController", FieldController);

    function FieldController(){
        var vm =this;

        //Event handler Declaration
        vm.addField = addField;

        function init(){

        }
        init();

        //Implementation of Event handler
        function addField(fieldType){
            console.log(fieldType);
        }
    }
})();