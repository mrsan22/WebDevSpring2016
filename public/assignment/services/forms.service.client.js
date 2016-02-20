"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
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
        function createFormForUser(userId, form, callback){
            form["_id"] = (new Date).getTime();
            form["userId"] = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            var formsArray = [];
            var each = "";
            for (each in forms){
                if(forms[each].userId == userId){
                    formsArray.push(forms[each]);
                }
            }
            callback(formsArray);
        }

        function deleteFormById(formId, callback){
            var each = "";
            for(each in forms){
                if(forms[each]._id == formId){
                    forms.splice(each, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            var each="";
            for(each in forms){
                if(forms[each]._id == formId){
                    forms[each] = newForm;
                    callback(forms[each]);
                }
            }
        }
    }

})();