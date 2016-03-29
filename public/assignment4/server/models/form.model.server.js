// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side form model
var mock_forms = require("./forms.mock.json");

module.exports = function(uuid, db, mongoose){

    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create low level mongoose form model
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        updateFormById : updateFormById,
        findFormById : findFormById,
        deleteFormById : deleteFormById
        //field model functions
        //getFieldsForForm : getFieldsForForm,
        //getFieldForForm: getFieldForForm,
        //createFieldForForm : createFieldForForm,
        //updateField : updateField,
        //deleteFieldFromForm : deleteFieldFromForm,
        //swapIndexOfFields : swapIndexOfFields
    };

    return api;

    function createFormForUser(userid, formObj){
        return FormModel.create(
            {"userId": userid, "title":formObj.title, "fields":[], "created":Date.now(), "updated":Date.now()}
        );
    }

    function findAllFormsForUser(userid){
        return FormModel.find({'userId': userid});
    }

    function updateFormById(formid, formObj){
        return FormModel.update(
            {'_id': formid},
            {"userId": formObj.userId, "title":formObj.title,
                "created": formObj.created, updated: Date.now(), "fields": formObj.fields, "__v": formObj.__v});
    }

    function findFormById(formid){
        return FormModel.findById({'_id': formid});
    }

    function deleteFormById(formid){
        return FormModel.remove({'_id': formid});
    }

    //field model functions
    //function getFieldsForForm(formId){
    //    for(var each in mock_forms){
    //        if(mock_forms[each]._id == formId){
    //            return mock_forms[each]["fields"];
    //        }
    //    }
    //}
    //
    //function getFieldForForm(formId, fieldId){
    //    for(var each in mock_forms){
    //        if(mock_forms[each]._id == formId){
    //            for(var field in mock_forms[each].fields){
    //                if(mock_forms[each].fields._id == fieldId){
    //                    return mock_forms[each].fields[field];
    //                }
    //                else{
    //                    return null;
    //                }
    //            }
    //        }
    //        else{
    //            return null;
    //        }
    //    }
    //}
    //
    //function createFieldForForm(formId, field){
    //    for(var each in mock_forms){
    //        if(mock_forms[each]._id == formId){
    //            field._id = uuid.v1();
    //            mock_forms[each].fields.push(field);
    //            return;
    //        }
    //    }
    //}
    //
    //function updateField(formId, fieldId, field){
    //    for(var each in mock_forms){
    //        if (mock_forms[each]._id == formId){
    //            for(var f in mock_forms[each].fields){
    //                if(mock_forms[each].fields[f]._id == fieldId){
    //                    mock_forms[each].fields[f] = field;
    //                    return;
    //                 }
    //                else{
    //                    console.log("FieldId didn't match");
    //                }
    //            }
    //        }
    //
    //    }
    //}
    //
    //function deleteFieldFromForm(formid, fieldid){
    //    for(var each in mock_forms){
    //        if(mock_forms[each]._id == formid){
    //            for(var f in mock_forms[each].fields){
    //                if(mock_forms[each].fields[f]._id == fieldid){
    //                    mock_forms[each].fields.splice(f,1);
    //                    return;
    //                }
    //            }
    //        }
    //    }
    //}
    //
    //function swapIndexOfFields(formId, start, end) {
    //    for (var each in mock_forms){
    //        if(mock_forms[each]._id == formId){
    //                //var temp = mock_forms[each].fields[start];
    //                //mock_forms[each].fields[start] = mock_forms[each].fields[end]
    //                //mock_forms[each].fields[end] = temp
    //                var fields = mock_forms[each].fields.splice(start, 1);
    //                mock_forms[each].fields.splice(end, 0, fields[0]);
    //        }
    //    }
    //}


};