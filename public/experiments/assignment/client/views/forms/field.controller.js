"use strict";
(function () {
        angular
            .module("FormBuilderApp")
            .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService, FormService){
        var vm =this;

        //Event handler Declaration
        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.editField  = editField;
        vm.updateField = updateField;


        function init(){
            vm.formId = $routeParams.formId;

            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                    vm.fields = response.data;

                }, function (error) {
                    console.log(error.statusText);
                });

            FormService
                .findFormById(vm.formId)
                .then(function (response) {
                    vm.formName = response.data.title;
                },
                    function (error) {
                        console.log(error.statusText);

                    })
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

        function editField(field){
            vm.modalField = {
                "_id": field._id,
                "label" : field.label,
                "type" : field.type,
                "placeholder" : field.placeholder
            };
            vm.fieldName = field.type;
            //vm.fieldLabel = field.label;
            vm.fieldOptions = field.options;
            //vm.fieldPlaceholder = field.placeholder;
            var options = [];

            if(field.type == 'TEXT' || field.type == 'TEXTAREA'){
                vm.showPlaceholder = true;
                vm.showOptions = false;
                vm.modalField.placeholder = field.placeholder;
            }

            else if(field.type == 'CHECKBOXES' || field.type == 'RADIOS' || field.type == 'OPTIONS'){
                vm.showPlaceholder = false;
                vm.showOptions = true;
                //setting of options on modal view
                for (var each in vm.fieldOptions){
                    var option = vm.fieldOptions[each].label +":"+ vm.fieldOptions[each].value+"\n";
                    options.push(option);
                }
                vm.modalField.options = options.join("");
            }
            else{
             //For other forms
                vm.showPlaceholder = false;
            }


        }

        function updateField(modalFieldObj){
            var options = [];
            if(modalFieldObj.type == 'CHECKBOXES' || modalFieldObj.type == 'RADIOS' || modalFieldObj.type == 'OPTIONS'){
                var optionsArray = modalFieldObj.options.split("\n");
                for(var i=0;i<optionsArray.length;i++){
                    var tempArray = optionsArray[i].split(":");
                    options.push({
                        "label" : tempArray[0],
                        "value" : tempArray[1]
                    });
                }
                modalFieldObj["options"] = options;
            }
            FieldService
                .updateField(vm.formId, modalFieldObj._id, modalFieldObj)
                .then(function (response) {
                    console.log(response);
                    vm.fields = response.data;
                },
                    function (error) {
                        console.log(error.statusText);
                    });

        }

    }
})();