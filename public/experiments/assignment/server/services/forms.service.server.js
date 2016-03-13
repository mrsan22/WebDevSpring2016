"use strict";
module.exports = function(app, model){

    //Declaration
    app.post("/api/assignment/createForm", createFormForUser);
    app.get("/api/assignment/findAllForms:userId", findAllFormsForUser);

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
};