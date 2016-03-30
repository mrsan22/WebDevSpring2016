"use strict";
module.exports = function(app, model) {

    //Declaration
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/field/startIndex/:start/endIndex/:end", swapIndexOfFields);

    //Implementation
    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        var fields = model.getFieldsForForm(formId);
        res.send(fields);

    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldObj = model.getFieldForForm(formId, fieldId);
        res.json(fieldObj);

    }

    function createFieldForForm(req, res){
        var formId = req.params.formId;
        var field = req.body;
        console.log(formId, field);
        //model.createFieldForForm(formId, field);
        //var fields = model.getFieldsForForm(formId);
        //res.json(fields);
        model
            .createFieldForForm(formId, field)
            .then(function (form) {
                console.log(form);
                res.json(form.fields);
            },
                function (error) {
                    res.status (400).send ("Error in creating fields for form", error.statusText);
                })

    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model.updateField(formId, fieldId, field);
        var fields = model.getFieldsForForm(formId);
        res.send(fields);
    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldFromForm(formId, fieldId);
        var fields = model.getFieldsForForm(formId);
        res.send(fields);
    }

    function swapIndexOfFields(req, res){
        var formId = req.params.formId;
        var start = req.params.start;
        var end = req.params.end;
        model.swapIndexOfFields(formId, start, end)


    }

};