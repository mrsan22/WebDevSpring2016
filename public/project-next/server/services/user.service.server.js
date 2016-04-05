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
    app.post("/api/project/admin-user", createAndFindAllUsers);
    //app.put("/api/project/userupdate/:userId",updateUserByIdNoSession);

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
        model_user
            .findUserByCredentials(credentials)
            .then(function (response) {
                    if(response != null) {
                        req.session.currentUser = response;
                        res.json(response);
                    }
                    else{
                        console.log("user does not exist, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in finding user by credentials", error.statusText);
                });
    }

    function register(req, res){
        var user = req.body;
        model_user
            .findUserByUsername(user.username)
            .then(function (response) {
                    if(response == null){
                        return model_user.createUser(user);
                    }
                    else{
                        console.log("username already exists");
                        res.json(null);
                    }
                },
                function (error) {
                    res.send ("Error in finding user by username", error.statusText);
                })
            .then(function (response) {
                    req.session.currentUser = response;
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error inserting User Info in database", error.statusText);
                });
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
        model_user
            .findUserByUsername(username)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in finding user by username", error.statusText);
                });
    }

    function findAllUsers(req, res){
        var allUsers = model_user.findAllUsers();
        res.send(allUsers);
    }

    function findUserById(req, res){
        var userId = req.params.userid;
        var user = model_user.findUserById(userId);
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
        if(req.session.currentUser._id == userid) {
            req.session.currentUser = user;
        }
        res.send(user);
    }

    //function updateUserByIdNoSession(req, res){
    //    var userid = req.params.userId;
    //    var userObj = req.body;
    //    model_user.updateUserById(userid, userObj);
    //    var user = model_user.findUserById(userid);
    //    res.send(user);
    //}

    function deleteUserById(req, res){
        var userId = req.params.userid;
        model_user.deleteUserById(userId);
        var users = model_user.findAllUsers();
        res.send(users);
    }

    function createAndFindAllUsers(req, res){
        user = req.body;
        var users = model_user.createAndFindAllUsers(user);
        res.send(users);
    }
};