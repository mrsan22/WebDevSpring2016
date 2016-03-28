"use strict";
module.exports = function(app, model) {

    //Declaration
    app.post("/api/assignment/login", findUserByCredentials);
    //app.get("/api/assignment/user?[username=username&password=password]", loginUser);
    //app.get("/api/assignment/user?[username=username]", findUserByUsername);
    app.get("/api/assignment/user",user);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    //app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:userid", findUserById);
    app.delete("/api/assignment/user/:userid", deleteUserById);
    app.put("/api/assignment/user/:userId", updateUserById);

    //new declaration
    // creates a new user and returns array of all users
    app.post("/api/assignment/user", createUser);

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

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loginUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var user = model.loginUser(username, password);
        req.session.currentUser = user;
        res.json(user);
    }


    function findUserByUsername(req, res){
        var username  = req.query.username;
        model
            .findUserByUsername()
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in finding user by username", error.statusText);
                });
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
        model
            .findUserByUsername(user.username)
            .then(function (response) {
                    if(response == null){
                        return model.createUser(user);
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

    function findAllUsers(req, res){
        var allUsers = model.findAllUsers();
        res.send(allUsers);
    }

    function findUserById(req, res){
        var userId = req.params.userid;
        var user = model.findUserById(userId);
        req.session.currentUser = user;
        res.json(user);
    }

    function deleteUserById(req, res){
        var userId = req.params.userid;
        var users = model.deleteUserById(userId);
        res.send(users);
    }

    function updateUserById(req, res){
        var userid = req.params.userId;
        var userObj = req.body;
        var updatedUsers = model.updateUserById(userid, userObj);
        res.send(updatedUsers);
    }

    function createUser(req, res){
        var user = req.body;
        users = model.createAndFindAllUsers(user);
        res.send(users);
    }
};