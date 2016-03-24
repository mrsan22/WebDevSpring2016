"use strict";
module.exports = function (app, model_user) {

    //Declaration
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);

    //Implementation
    function register(req, res){
        var user = req.body;
        user = model_user.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res){
        res.json(req.session.currentUser);
    }


};