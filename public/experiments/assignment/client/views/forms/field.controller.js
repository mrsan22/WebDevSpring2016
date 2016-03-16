"use strict";
(function () {
        angular
            .module("FormBuilderApp")
            .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService){
        var vm =this;

        //Event handler Declaration
        vm.addField = addField;


        function init(){
            vm.formId = $routeParams.formId;

            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                    vm.fields = response.data;

                }, function (error) {
                    console.log(error.statusText);
                });
        }
        init();

        //Implementation of Event handler
        function addField(fieldType){
            if(!fieldType){
                return;
            }
            console.log(fieldType);

        }
    }
})();