"use strict";
module.exports = function(app, model) {

    //Declaration
    app.post("/api/assignment/login", findUserByCredentials);
    app.post("/api/assignment/user", findUserByUsername);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/users", findAllUsers);
    app.post("/api/assignment/userById", findUserById);
    app.post("/api/assignment/deleteuser", deleteUserById);
    app.post("/api/assignment/updateuser", updateUserById);

    //Implementation
    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserByUsername(req, res){
        var username  = req.body;
        var user = model.findUserByUsername(username);
        res.json(user);
    }

    function loggedin(req, res){
        res.json(req.session.currentUser);
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function register(req, res){
        var user = req.body;
        user = model.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findAllUsers(req, res){
        var allUsers = model.findAllUsers();
        res.send(allUsers);
    }

    function findUserById(req, res){
        var userId = req.body;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function deleteUserById(req, res){
        var userId = req.body;
        var users = model.deleteUserById(userId);
        res.send(users);
    }

    function updateUserById(req, res){
        var userObj = req.body;
        var updatedUser = model.updateUserById(userObj);
        res.json(updatedUser);
    }
};