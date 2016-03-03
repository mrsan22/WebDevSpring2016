"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


    function FormController($scope, $rootScope, $location, FormService){
        $scope.user = $rootScope.user;
        if (!$scope.user) {
            $location.url("/home");
        }
        if($rootScope.user != undefined){
            var userId;
            userId = $rootScope.user._id;

            FormService.findAllFormsForUser(
                userId,
                function(form){
                    $scope.forms = form;
                }
            );
        }


        //Event handler declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedFormIndex = -1;

        //Implementation of event handler
        function addForm(formObj){
            if (!formObj || !formObj.title){
                return;
            }
            FormService.createFormForUser(
                userId,
                formObj,
                function(form){
                    console.log("New Form added",form);
                    FormService.findAllFormsForUser(
                        userId,
                        function(forms){
                            //var newforms = forms;
                            $scope.forms = forms;
                            $scope.form = {};
                            console.log("Forms object after adding new form",$scope.forms);
                        }
                    )
                }
            )

        }
        //var selectedFormIndex;
        function updateForm(formObj){
            if(!formObj || !formObj.title){
                return;
            }
            FormService.updateFormById(
                formObj._id,
                formObj,
                function(form){
                    if (selectedFormIndex >= 0) {
                        $scope.forms[selectedFormIndex] = form;
                        $scope.form = {};
                        selectedFormIndex = -1;
                    }

                }
            )
        }

        function selectForm(formIndex){
            console.log(formIndex)
             selectedFormIndex = formIndex;
            var selectForm = {
                "_id" : $scope.forms[formIndex]._id,
                "title" : $scope.forms[formIndex].title,
                "userId" : $scope.forms[formIndex].userId
            };
            $scope.form = selectForm;
        }

        function deleteForm(formIndex){
            FormService.deleteFormById(
                $scope.forms[formIndex]._id,
                function(forms){
                    FormService.findAllFormsForUser(
                        userId,
                        function(form){
                            $scope.forms = form;
                        }
                    )
                }
            )
        }
    }
})();