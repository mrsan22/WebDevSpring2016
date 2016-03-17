// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side form model
var mock_forms = require("./forms.mock.json");

module.exports = function(){
    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        updateFormById : updateFormById,
        findFormById : findFormById,
        deleteFormById : deleteFormById,
        //field model functions
        getFieldsForForm : getFieldsForForm,
        getFieldForForm: getFieldForForm,
        createFieldForForm : createFieldForForm,
        updateField : updateField,
        deleteFieldFromForm : deleteFieldFromForm,
        swapIndexOfFields : swapIndexOfFields
    };

    return api;

    function createFormForUser(userid, formObj){
        var userForms = findAllFormsForUser(userid);
        if (userForms) {
            for (var i = 0; i < userForms.length; i++) {
                if (userForms[i].title == formObj.title) {
                    return null;
                }
            }
        }
        var id = (new Date).getTime();
        var newForm = {
            "_id" : id,
            "userId" : userid,
            "title" : formObj["title"]
        };
        mock_forms.push(newForm);
        return newForm;
    }

    function findAllFormsForUser(userid){
            var formsArray = [];
            for (each in mock_forms){
                if(mock_forms[each].userId == userid){
                    formsArray.push(mock_forms[each]);
                }
            }
        return formsArray;
    }

    function updateFormById(formid, formObj){
        var userForms = findAllFormsForUser(formObj.userId);
        for (var i = 0; i < userForms.length; i++) {
            if (userForms[i].title == formObj.title) {
                return null;
            }
        }
        for(var each in mock_forms){
            if(mock_forms[each]._id == formid){
                var formnew = {
                    "_id" : formObj["_id"],
                    "userId" : formObj["userId"],
                    "title" : formObj["title"]
                };
                mock_forms[each] = formnew;
                return (mock_forms[each]);
            }
        }
    }

    function findFormById(formid){
        for(var f in mock_forms){
            if(mock_forms[f]._id == formid){
                return mock_forms[f];
            }
        }
        // form not found
        console.log("form not found by Id, returning null");
        return null;
    }

    function deleteFormById(formid){
        for(var each in mock_forms){
            if(mock_forms[each]._id == formid){
                mock_forms.splice(each, 1);
                return mock_forms;
            }
        }
    }

    //field model functions
    function getFieldsForForm(formId){
        for(var each in mock_forms){
            if(mock_forms[each]._id == formId){
                return mock_forms[each]["fields"];
            }
        }
    }

    function getFieldForForm(formId, fieldId){
        for(var each in mock_forms){
            if(mock_forms[each]._id == formId){
                for(var field in mock_forms[each].fields){
                    if(mock_forms[each].fields._id == fieldId){
                        return mock_forms[each].fields[field];
                    }
                    else{
                        return null;
                    }
                }
            }
            else{
                return null;
            }
        }
    }

    function createFieldForForm(formId, field){
        for(var each in mock_forms){
            if(mock_forms[each]._id == formId){
                field._id = (new Date).getTime();
                mock_forms[each].fields.push(field);
                return;
            }
        }
    }

    function updateField(formId, fieldId, field){
        for(var each in mock_forms){
            if (mock_forms[each]._id == formId){
                for(var f in mock_forms[each].fields){
                    if(mock_forms[each].fields._id == fieldId){
                        field._id = (new Date).getTime();
                        //var newField = {
                        //    "_id" : id,
                        //    "type" : field["type"],
                        //    "label" : field["label"],
                        //    "placeholder" : field["placeholder"]
                        //};
                        mock_forms[each].fields[f] = field;
                        return mock_forms[each].fields[f];
                     }
                }
            }

        }
    }

    function deleteFieldFromForm(formid, fieldid){
        for(var each in mock_forms){
            if(mock_forms[each]._id == formid){
                for(var f in mock_forms[each].fields){
                    if(mock_forms[each].fields[f]._id == fieldid){
                        mock_forms[each].fields.splice(f,1);
                        return;
                    }
                }
            }
        }
    }

    function swapIndexOfFields(formId, start, end) {
        for (var each in mock_forms){
            if(mock_forms[each]._id == formId){
                for(var f in mock_forms[each].fields){
                    var temp = mock_forms[each].fields[start];
                    mock_forms[each].fields[start] = mock_forms[each].fields[end]
                    mock_forms[each].fields[end] = temp
                }
            }
        }
    }


};