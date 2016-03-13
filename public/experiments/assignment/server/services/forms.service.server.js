"use strict";
module.exports = function(app, model){

    //Declaration
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.put("/api/assignment/updateformbyid/:formId", updateFormById);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    //Implementation
    function createFormForUser(req, res){
        var userid = req.params.userId;
        var formObj = req.body;
        var form = model.createFormForUser(userid, formObj);
        res.json(form);
    }

    function findAllFormsForUser(req, res){
        var userid = req.params.userId;
        var forms = model.findAllFormsForUser(userid);
        res.send(forms);
    }

    function findFormById(req, res){
        var formid = req.params.formId;
        var form = model.findFormById(formid);
        res.json(form);
    }

    function updateFormById(req, res){
        var formid = req.params.formId;
        var formObj = req.body;
        var form = model.updateFormById(formid, formObj);
        res.send(form);
    }

    function deleteFormById(req, res){
        var formid = req.params.formId;
        var forms = model.deleteFormById(formid);
        res.send(forms);
    }

};