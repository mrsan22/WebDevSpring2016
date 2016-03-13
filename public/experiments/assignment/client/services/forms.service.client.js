"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        //Declaration of interface
        var formServiceApi = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            findFormById : findFormById,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return formServiceApi;

        //Implementation of Interfaces
        function createFormForUser(userid, FormObj){
            return $http.post("/api/assignment/user/" + userid+"/form", FormObj);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/" + userId+"/form");
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/" + formId);
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/" + formId);


        }
        function updateFormById(formId, formObj){
            return $http.put("/api/assignment/form/"+ formId, formObj);
        }
    }

})();