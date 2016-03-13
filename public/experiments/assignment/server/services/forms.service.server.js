"use strict";
module.exports = function(app, model){

    //Declaration
    app.post("/api/assignment/createForm", createFormForUser);
    app.get("/api/assignment/findAllForms/:userId", findAllFormsForUser);
    app.put("/api/assignment/updateformbyid/:formId", updateFormById);

    //Implementation
    function createFormForUser(req, res){
        var formObj = req.body;
        var form = model.createFormForUser(formObj);
        res.json(form);
    }

    function findAllFormsForUser(req, res){
        var userid = req.params.userId;
        var forms = model.findAllFormsForUser(userid);
        res.send(forms);
    }

    function updateFormById(req, res){
        var formid = req.params.formId;
        var formObj = req.body;
        var form = model.updateFormById(formid, formObj);
        res.send(form);
    }
};