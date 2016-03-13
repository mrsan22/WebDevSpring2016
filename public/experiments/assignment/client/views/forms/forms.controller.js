"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


    function FormController($location, FormService, UserService){
    //    $scope.user = $rootScope.user;
    //    if (!$scope.user) {
    //        $location.url("/home");
    //    }
    //    if($rootScope.user != undefined){
    //        var userId;
    //        userId = $rootScope.user._id;
    //
    //        FormService.findAllFormsForUser(
    //            userId,
    //            function(form){
    //                $scope.forms = form;
    //            }
    //        );
    //    }
    //
    //
    //    //Event handler declaration
    //    $scope.addForm = addForm;
    //    $scope.updateForm = updateForm;
    //    $scope.deleteForm = deleteForm;
    //    $scope.selectForm = selectForm;
    //    var selectedFormIndex = -1;
    //
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
                        FormService.findAllFormsForUser(
                            vm.userId,
                            function (forms){
                                vm.forms = forms;
                            }
                        );
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

            FormService.createFormForUser(
                vm.userId,
                formObj,
                function(form){
                    console.log("New Form added",form);
                    FormService.findAllFormsForUser(
                        vm.userId,
                        function(forms){
                            //var newforms = forms;
                            vm.forms = forms;
                            vm.form = {};
                            console.log("Forms object after adding new form",vm.forms);
                        }
                    )
                }
            )

        }

        function updateForm(formObj){
            if(!formObj || !formObj.title){
                return;
            }
            FormService.updateFormById(
                formObj._id,
                formObj,
                function(form){
                    if (selectedFormIndex >= 0) {
                        vm.forms[selectedFormIndex] = form;
                        vm.form = {};
                        selectedFormIndex = -1;
                    }

                }
            )
        }

        function selectForm(formIndex){
            console.log(formIndex);
             selectedFormIndex = formIndex;
            var selectForm = {
                "_id" : vm.forms[formIndex]._id,
                "title" : vm.forms[formIndex].title,
                "userId" : vm.forms[formIndex].userId
            };
            vm.form = selectForm;
        }

        function deleteForm(formIndex){
            FormService.deleteFormById(
                vm.forms[formIndex]._id,
                function(forms){
                    FormService.findAllFormsForUser(
                        vm.userId,
                        function(form){
                            vm.forms = form;
                        }
                    )
                }
            )
        }
    }


})();