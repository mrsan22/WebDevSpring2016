"use strict";
module.exports = function(app, model) {

    //Declaration
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/field/startIndex/:start/endIndex/:end", sortFields);

    //Implementation
    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        model
            .getFieldsForForm(formId)
            .then(function (form) {
                res.json(form.fields);
            },
                function (error) {
                    res.status (400).send ("Error in fetching fields for form", error.statusText);
                })

    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .getFieldForForm(formId, fieldId)
            .then(function (field) {
                    res.json(field);
                },
                function (error) {
                    res.status (400).send ("Error in fetching single field for form", error.statusText);
                })

    }

    function createFieldForForm(req, res){
        var formId = req.params.formId;
        var field = req.body;
        model
            .createFieldForForm(formId, field)
            .then(function (form) {
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
        model
            .updateField(formId, fieldId, field)
            .then(function (response) {
                    return model.getFieldsForForm(formId);
                },
                function (error) {
                    res.status (400).send ("Error in updating fields from form", error.statusText);
                })
            .then(function (form) {
                        res.json(form.fields);
                    },
                    function (error) {
                        res.status (400).send ("Error in fetching fields for form", error.statusText);
                    });


    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldFromForm(formId, fieldId)
            .then(function (response) {
                    res.json(response.fields);
                },
                function (error) {
                    res.status (400).send ("Error in deleting fields from form", error.statusText);
                });
    }

    function sortFields(req, res){
        var formId = req.params.formId;
        var start = req.params.start;
        var end = req.params.end;
        //model.swapIndexOfFields(formId, start, end)
        if(start && end){
            model
                .sortFields(formId, start, end)
                .then(function (response) {

                },
                    function (error) {
                        res.status (400).send ("Error in sorting fields from form", error.statusText);
                    })
        }


    }

};