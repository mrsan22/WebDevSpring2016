"use strict";
module.exports = function(app, model){

    //Declaration
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    //Implementation
    function createFormForUser(req, res){
        var userid = req.params.userId;
        var formObj = req.body;
        model
            .findAllFormsForUser(userid)
            .then(function (userForms) {
                for (var i = 0; i < userForms.length; i++) {
                    if (userForms[i].title == formObj.title) {
                        res.json(null);
                        return;
                    }
                }
                return model.createFormForUser(userid, formObj);
            },
                function (error) {
                    res.status (400).send ("Error in finding all forms for user", error.statusText);
                })
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in creating forms for user", error.statusText);
                })
    }

    function findAllFormsForUser(req, res){
        var userid = req.params.userId;
        model
            .findAllFormsForUser(userid)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in finding all forms for user", error.statusText);
                })
    }

    function findFormById(req, res){
        var formid = req.params.formId;
        //var form = model.findFormById(formid);
        //res.json(form);
        model
            .findFormById(formid)
            .then(function (response) {
                if(response != null) {
                    res.json(response);
                }
                else{
                    res.json(null);
                }
                },
                function (error) {
                    res.status (400).send ("Error in finding form by Id", error.statusText);
                })
    }

    function updateFormById(req, res){
        var formid = req.params.formId;
        var formObj = req.body;
        var form = model.updateFormById(formid, formObj);
        res.send(form);
    }

    function deleteFormById(req, res){
        var formid = req.params.formId;
        model
            .deleteFormById(formid)
            .then(function (response) {
                    res.send(200);
                },
                function (error) {
                    res.status (400).send ("Error in deleting form by Id", error.statusText);
                })
    }

};