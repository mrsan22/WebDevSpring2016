"use strict";
(function () {
        angular
            .module("FormBuilderApp")
            .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService){
        var vm =this;

        //Event handler Declaration
        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;


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
        function addField(fieldIndex){
            if(!fieldIndex){
                return;
            }
            var fieldTypes = [
                //Single Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                //Date Field
                {"_id": null, "label": "New Date Field", "type": "DATE"},
                //DropDownField
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]},
                //Checkboxes Field
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]},
                //Radio Buttons Field
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]},
                //Multi Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}

            ];

            FieldService
                .createFieldForForm(vm.formId, fieldTypes[fieldIndex])
                .then(function (response) {
                    vm.fields = response.data;
                },
                    function (error) {
                        console.log(error.statusText);
                    });


        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm(vm.formId, field._id)
                .then(function (response) {
                    vm.fields = response.data;
                }, function (error) {
                    console.log(error.statusText);
                });
        }

        function cloneField(field){
            if(!field){
                return;
            }
            FieldService
                .createFieldForForm(vm.formId, field)
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function (error) {
                        console.log(error.statusText);
                    });


        }


    }
})();