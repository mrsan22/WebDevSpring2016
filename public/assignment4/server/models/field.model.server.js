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
        sortFields : sortFields
    };

    return api;

    function getFieldsForForm(formId){
        return FormModel.findById(formId);
    }

    function getFieldForForm(formId, fieldId){
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
                if(field._id){
                    delete field._id;
                }
                form.fields.push(field);
                return form.save();
            },
                function (error) {
                    res.status (400).send ("Error in finding form by Id from field model", error.statusText);
                });
    }

    function updateField(formId, fieldId, field){
        return FormModel.findById(formId)
            .then(function (form) {
                var fieldDb = form.fields.id(fieldId);
                fieldDb.label = field.label;
                if(fieldDb.placeholder) {
                    fieldDb.placeholder = field.placeholder;
                }
                if(fieldDb.options.length > 0){
                    fieldDb.options = field.options;
                }
                return form.save();


            },
                function (error) {
                    res.status (400).send ("Error in updating field from form in field model", error.statusText);
                });
    }

    function deleteFieldFromForm(formid, fieldid){
        return FormModel.findById(formid)
            .then(function (form) {
                    form.fields.id(fieldid).remove();
                    return form.save();
                },
                function (error) {
                    res.status (400).send ("Error in deleting field from form in field model", error.statusText);
                });
    }

    //function swapIndexOfFields(formId, start, end) {
    //    for (var each in mock_forms){
    //        if(mock_forms[each]._id == formId){
    //            //var temp = mock_forms[each].fields[start];
    //            //mock_forms[each].fields[start] = mock_forms[each].fields[end]
    //            //mock_forms[each].fields[end] = temp
    //            var fields = mock_forms[each].fields.splice(start, 1);
    //            mock_forms[each].fields.splice(end, 0, fields[0]);
    //        }
    //    }
    //}

    function sortFields(formId, startIndex, endIndex){
        return FormModel.findById(formId)
            .then(function (form) {
                form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                // notify mongoose 'pages' field changed
                form.markModified("fields");
                form.save();
            },
                function (error) {
                    res.status (400).send ("Error in sorting field from form in field model", error.statusText);
                })
    }

};