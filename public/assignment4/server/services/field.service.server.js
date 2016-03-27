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
        model.createFieldForForm(formId, field);
        var fields = model.getFieldsForForm(formId);
        res.json(fields);
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