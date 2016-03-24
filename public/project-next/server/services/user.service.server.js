"use strict";
module.exports = function (app, model_user) {

    //Declaration
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/user",user);
    app.post("/api/project/logout", logout);

    //Implementation
    //function to redirect call coming to '/api/assignment/user' path
    function user(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            loginUser(req, res);
        }
        else if (username) {
            findUserByUsername(req);
        }
        else {
            findAllUsers(req, res);
        }
    }

    function register(req, res){
        var user = req.body;
        user = model_user.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res){
        res.json(req.session.currentUser);
    }

    function loginUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var user = model_user.loginUser(username, password);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserByUsername(req, res){
        var username  = req.query.username;
        console.log(username);
        var user = model_user.findUserByUsername(username);
        res.json(user);
    }

    function findAllUsers(req, res){
        var allUsers = model_user.findAllUsers();
        res.send(allUsers);
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

};