"use strict";
module.exports = function (app, model_user) {

    //Declaration
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/user",user);
    app.post("/api/project/login", findUserByCredentials);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:userId", updateUserById);
    app.get("/api/project/user/:userid", findUserById);
    app.delete("/api/project/user/:userid", deleteUserById);

    //Implementation
    //function to redirect call coming to '/api/project/user' path
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

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model_user.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
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

    function findUserById(req, res){
        var userId = req.params.userid;
        var user = model_user.findUserById(userId);
        req.session.currentUser = user;
        res.json(user);
    }


    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function updateUserById(req, res){
        var userid = req.params.userId;
        var userObj = req.body;
        model_user.updateUserById(userid, userObj);
        var user = model_user.findUserById(userid);
        req.session.currentUser = user;
        res.send(user);
    }

    function deleteUserById(req, res){
        var userId = req.params.userid;
        var users = model_user.deleteUserById(userId);
        res.send(users);
    }

};