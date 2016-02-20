"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){
        var userId;
         userId = $rootScope.user._id;
        FormService.findAllFormsForUser(
            userId,
            function(form){
                $scope.forms = form;
                console.log($scope.forms);
            }
        );
        //Event handler declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        //$scope.deleteForm = deleteForm;
        //$scope.selectForm = selectForm;

        //Implementation of event handler
        function addForm(formObj){
            FormService.createFormForUser(
                userId,
                formObj,
                function(form){
                    console.log(form);
                    //$scope.forms = form;
                }
            )

        }

        function updateForm(formObj){

        }
    }
})();