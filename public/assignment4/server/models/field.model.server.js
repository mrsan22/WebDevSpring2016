// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side form model
var mock_forms = require("./forms.mock.json");

module.exports = function(uuid, db, mongoose, form_model){

    //creating lowlevel mongoose FormModel
    var FormModel = form_model.getMongooseModel();

    var api = {
        getFieldsForForm : getFieldsForForm,
        getFieldForForm: getFieldForForm,
        createFieldForForm : createFieldForForm,
        updateField : updateField,
        deleteFieldFromForm : deleteFieldFromForm,
        swapIndexOfFields : swapIndexOfFields
    };

    return api;

    function getFieldsForForm(formId){
        return FormModel.findById(formId);
    }

    function getFieldForForm(formId, fieldId){
        //for(var each in mock_forms){
        //    if(mock_forms[each]._id == formId){
        //        for(var field in mock_forms[each].fields){
        //            if(mock_forms[each].fields._id == fieldId){
        //                return mock_forms[each].fields[field];
        //            }
        //            else{
        //                return null;
        //            }
        //        }
        //    }
        //    else{
        //        return null;
        //    }
        //}
        return FormModel.findById(formId)
            .then(function (form) {
                if(form.fields) {
                    return form.fields.id(fieldId);
                }
                else{
                    return null;
                }
            },
                function (error) {
                    res.status (400).send ("Error in finding form by Id from field model", error.statusText);
                });
    }

    function createFieldForForm(formId, field){
        return FormModel.findById(formId)
            .then(function (form) {
                form.fields.push(field);
                return form.save();
            },
                function (error) {
                    res.status (400).send ("Error in finding form by Id from field model", error.statusText);
                });
    }

    function updateField(formId, fieldId, field){
        for(var each in mock_forms){
            if (mock_forms[each]._id == formId){
                for(var f in mock_forms[each].fields){
                    if(mock_forms[each].fields[f]._id == fieldId){
                        mock_forms[each].fields[f] = field;
                        return;
                    }
                    else{
                        console.log("FieldId didn't match");
                    }
                }
            }

        }
    }

    function deleteFieldFromForm(formid, fieldid){
        //for(var each in mock_forms){
        //    if(mock_forms[each]._id == formid){
        //        for(var f in mock_forms[each].fields){
        //            if(mock_forms[each].fields[f]._id == fieldid){
        //                mock_forms[each].fields.splice(f,1);
        //                return;
        //            }
        //        }
        //    }
        //}
        return FormModel.findById(formid)
            .then(function (form) {
                    form.fields.id(fieldid).remove();
                    return form.save();
                },
                function (error) {
                    res.status (400).send ("Error in deleting field from form in field model", error.statusText);
                });
    }

    function swapIndexOfFields(formId, start, end) {
        for (var each in mock_forms){
            if(mock_forms[each]._id == formId){
                //var temp = mock_forms[each].fields[start];
                //mock_forms[each].fields[start] = mock_forms[each].fields[end]
                //mock_forms[each].fields[end] = temp
                var fields = mock_forms[each].fields.splice(start, 1);
                mock_forms[each].fields.splice(end, 0, fields[0]);
            }
        }
    }

};