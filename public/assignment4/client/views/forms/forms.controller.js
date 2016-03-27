"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


    function FormController($location, FormService, UserService){
        var vm = this;

        //Event handler declaration
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        var selectedFormIndex = -1;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                        vm.currentUser = response.data;
                        vm.userId = vm.currentUser._id;
                        FormService
                            .findAllFormsForUser(vm.userId)
                            .then(function (forms){
                                //console.log("Forms",forms);
                                vm.forms = forms.data;
                            },
                            function(error){
                                console.log(error.statusText);
                            });

                    },
                    function(error){
                        console.log(error.statusText);
                    });
        }
        init();

        //Implementation of event handler
        function addForm(formObj){
            if (!formObj || !formObj.title){
                return;
            }

            FormService
                .createFormForUser(
                vm.userId,
                formObj)
                .then(function(response){
                    console.log(response);
                    if(response.data) {
                        FormService.findAllFormsForUser(
                            vm.userId)
                            .then(function (response) {
                                    vm.forms = response.data;
                                    vm.form = {};
                                    console.log("Forms object after adding new form", vm.forms);
                                },
                                function (error) {
                                    console.log("Failed to retrieve updated forms array", error.statusText);
                                })
                    }
                    else{
                        //console.log("Form with same title cannot be added!!");
                        vm.show = true;
                        vm.form = {};
                    }
                },
                function(error){
                    console.log("Failed to retrieve newly created form",error.statusText);

                });

        }

        function updateForm(formObj){
            if(!formObj || !formObj.title){
                return;
            }
            FormService
                .updateFormById(
                formObj._id,
                formObj)
                .then(function(response){
                    if (selectedFormIndex >= 0 && response.data) {
                        vm.forms[selectedFormIndex] = response.data;
                        vm.form = {};
                        selectedFormIndex = -1;
                    }
                    else{
                        //vm.showUpdate = true;
                        vm.form = {};
                    }
                });
        }

        function selectForm(formIndex){
             selectedFormIndex = formIndex;
            var selectForm = {
                "_id" : vm.forms[formIndex]._id,
                "title" : vm.forms[formIndex].title,
                "userId" : vm.forms[formIndex].userId,
                "fields" : vm.forms[formIndex].fields
            };
            vm.form = selectForm;
        }

        function deleteForm(formIndex){
            FormService
                .deleteFormById(vm.forms[formIndex]._id)
                .then(function(forms){
                    FormService
                        .findAllFormsForUser(vm.userId)
                        .then(function(form){
                            vm.forms = form.data;
                        },
                        function(error){
                            console.log("Failed to update forms for particular user after deletion",error.statusText);
                        });
                },
                    function (error) {
                        console.log("Failed to retrieve form arrays after deletion",error.statusText);
                    });

        }
    }


})();