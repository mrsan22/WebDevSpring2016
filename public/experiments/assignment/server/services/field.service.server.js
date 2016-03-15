"use strict";
module.exports = function(app, model) {

    //Declaration
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

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
        var newField = model.createFieldForForm(formId, field);
        res.json(newField);
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedField = model.updateField(formId, fieldId, field);
        res.json(updatedField);
    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = model.deleteFieldFromForm(formId, fieldId);
        res.send(forms);
    }

};