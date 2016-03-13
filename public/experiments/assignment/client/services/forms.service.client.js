"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        //Declaration of interface
        var formServiceApi = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return formServiceApi;

        //Implementation of Interfaces
        function createFormForUser(FormObj){
            console.log(FormObj);
            return $http.post("/api/assignment/createForm", FormObj);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/findAllForms" + userId);
        }

        function deleteFormById(formId, callback){
            var each = "";
            for(each in forms){
                if(forms[each]._id == formId){
                    forms.splice(each, 1);
                    console.log(forms);
                    callback(forms);
                    return;
                }
            }


        }

        function updateFormById(formId, newForm, callback){
            var each="";
            for(each in forms){
                if(forms[each]._id == formId){
                    var formnew = {
                        "_id" : newForm["_id"],
                        "userId" : newForm["userId"],
                        "title" : newForm["title"]
                    };
                    forms[each] = formnew;
                    callback(forms[each]);
                    return;
                }
            }
        }
    }

})();