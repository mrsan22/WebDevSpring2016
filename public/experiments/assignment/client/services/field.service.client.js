"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        //Declaration of Interface
        var formServiceApi = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField
        };

        return formServiceApi;

        //Implementation of Interfaces
        function createFieldForForm(){

        }

        function getFieldsForForm(){

        }

        function getFieldForForm(){

        }

        function deleteFieldFromForm(){

        }

        function updateField(){

        }
    }
})();