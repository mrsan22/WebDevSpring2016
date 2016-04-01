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
        model
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

    function loginUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .loginUser(username, password)
            .then(function (response) {
                    if(response != null) {
                        req.session.currentUser = response;
                        console.log("User exists, returning found user");
                        res.json(response);
                    }
                    else{
                        console.log("user does not exist, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in loginUser function", error.statusText);
                });

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
        model
            .findAllUsers()
            .then(function (response) {
                    if(response != null) {
                        res.json(response);
                    }
                    else{
                        console.log("User collection is empty");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findAllUsers function", error.statusText);
                });
    }

    function findUserById(req, res){
        var userId = req.params.userid;
        model
            .findUserById(userId)
            .then(function (response) {
                    if(response != null) {
                        res.json(response);
                    }
                    else{
                        console.log("User not found by Id, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function", error.statusText);
                });

    }

    function deleteUserById(req, res){
        var userId = req.params.userid;
        model
            .deleteUserById(userId)
            .then(function (response) {
                    //res.send(200);
                    return model.findAllUsers();
                },
                function (error) {
                    res.status (400).send ("Error in deleting user by Id", error.statusText);
                })
            //Accepting the response from model.findAllUsers to return remaining set of users.
            .then(function (response) {
                        if(response != null) {
                            res.json(response);
                        }
                        else{
                            console.log("User collection is empty");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.status (400).send ("Error in findAllUsers function", error.statusText);
                    });

    }

    function updateUserById(req, res){
        var userid = req.params.userId;
        var userObj = req.body;
        model
            .updateUserById(userid, userObj)
            .then(function (response) {
                //console.log(response);
                //res.send(200);
                return model.findUserById(userid);
            },
                function (error) {
                    res.status (400).send ("Error in updating user by Id", error.statusText);
                })
            .then(function (response) {
                    if(response != null) {
                        req.session.currentUser = response;
                        res.json(response);
                    }
                    else{
                        console.log("User not found by Id after updating the user, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function after updating the user", error.statusText);
                });
    }

    //For admin
    function createUser(req, res){
        var user = req.body;
        //users = model.createAndFindAllUsers(user);
        //res.send(users);
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
                    //req.session.currentUser = response;
                    //res.json(response);
                return model.findAllUsers();
                },
                function (error) {
                    res.status (400).send ("Error inserting User Info in database", error.statusText);
                })
            .then(function (response) {
                    if(response != null) {
                        res.json(response);
                    }
                    else{
                        console.log("User collection is empty");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findAllUsers function", error.statusText);
                });
    }
};