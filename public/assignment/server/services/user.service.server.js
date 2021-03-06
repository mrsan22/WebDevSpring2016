"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, model, securityService) {


    var passport = securityService.getPassport();

    //Declaration
    var auth = authorized;
    app.post("/api/assignment/login", findUserByCredentials);
    //app.get("/api/assignment/user?[username=username&password=password]", loginUser);
    //app.get("/api/assignment/user?[username=username]", findUserByUsername);
    app.post("/api/assignment/user",passport.authenticate('assignment'),user);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/admin/user",auth, findAllUsers);
    app.get("/api/assignment/user/:userid", auth, findUserById);
    app.get("/api/assignment/admin/user/:userid", auth, getUserById);
    app.delete("/api/assignment/admin/user/:userid", auth,deleteUserById);
    app.put("/api/assignment/admin/user/:userId", auth,updateUserById);

    //new declaration
    // creates a new user and returns array of all users
    app.post("/api/assignment/admin/user", auth,createUser);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

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
        //else {
        //    console.log("here");
        //    findAllUsers(req, res);
        //}


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
        //var username = req.query.username;
        //var password = req.query.password;
        //model
        //    .loginUser(username, password)
        //    .then(function (response) {
        //            if(response != null) {
        //                req.session.currentUser = response;
        //                console.log("User exists, returning found user");
        //                res.json(response);
        //            }
        //            else{
        //                console.log("user does not exist, returning null");
        //                res.json(null);
        //            }
        //        },
        //        function (error) {
        //            res.status (400).send ("Error in loginUser function", error.statusText);
        //        });
        var currentUser = req.user;
        res.json(currentUser);
    }


    function findUserByUsername(req, res){
        var username  = req.query.username;
        model
            .findUserByUsername(username)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in finding user by username", error.statusText);
                });
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() && req.user.type == 'assignment'? req.user : null);
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }


    function register(req, res){
        //var user = req.body;
        //model
        //    .findUserByUsername(user.username)
        //    .then(function (response) {
        //            if(response == null){
        //                return model.createUser(user);
        //            }
        //            else{
        //                console.log("username already exists");
        //                res.json(null);
        //            }
        //        },
        //        function (error) {
        //            res.send ("Error in finding user by username", error.statusText);
        //        })
        //    .then(function (response) {
        //            req.session.currentUser = response;
        //            res.json(response);
        //        },
        //        function (error) {
        //            res.status (400).send ("Error inserting User Info in database", error.statusText);
        //        });
        var user = req.body;
        user.roles = ['student'];
        model.findUserByUsername(user.username)
            .then(function (response) {
                    if(response == null){
                        user.password = bcrypt.hashSync(user.password);
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
            .then(function (user) {
                    //req.session.currentUser = response;
                    //res.json(response);
                    if(user){
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status (400).send ("Error inserting User Info in database", error.statusText);
                });
    }


    function findAllUsers(req, res){
        if(isAdmin(req.user)) {
            model
                .findAllUsers()
                .then(function (response) {
                        if (response != null) {
                            res.json(response);
                        }
                        else {
                            console.log("User collection is empty");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.status(400).send("Error in findAllUsers function", error.statusText);
                    });
        }
        else{
            res.status(403).send("Not authorized to be admin");
        }
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

    function getUserById(req, res){
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
                    res.status (400).send ("Error in getUserById function", error.statusText);
                });

    }

    function deleteUserById(req, res){
        var userId = req.params.userid;
        if(isAdmin(req.user)) {
            model
                .deleteUserById(userId)
                .then(function (response) {
                        return model.findAllUsers();
                    },
                    function (error) {
                        res.status(400).send("Error in deleting user by Id", error.statusText);
                    })
                //Accepting the response from model.findAllUsers to return remaining set of users.
                .then(function (response) {
                        if (response != null) {
                            res.json(response);
                        }
                        else {
                            console.log("User collection is empty");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.status(400).send("Error in findAllUsers function", error.statusText);
                    });
        }
        else{
            res.status(403).send("Not authorized to be admin");
        }

    }

    function updateUserById(req, res){
        var userid = req.params.userId;
        var userObj = req.body;

        //for posters/hackers
        if(!isAdmin(req.user)) {
            delete userObj.roles;
        }
        if(typeof userObj.roles == "string") {
            userObj.roles = userObj.roles.split(",");
        }
        if(userObj.emails && typeof userObj.emails == "string") {
            userObj.emails = userObj.emails.split(",");
        }
        if(userObj.phones && typeof userObj.phones == "string") {
            userObj.phones = userObj.phones.split(",");
        }
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



    function isAdmin(user){
        if(user.roles.indexOf("admin") > -1){
            console.log(user);
            return true;
        }
        else{
            return false;
        }
    }

    //For admin
    function createUser(req, res){
        var user = req.body;
        if(user.roles && user.roles.length > 1) {
            user.roles = user.roles.split(",");
        } else {
            user.roles = ["student"];
        }
        model
            .findUserByUsername(user.username)
            .then(function (response) {
                    if(response == null){
                        user.password = bcrypt.hashSync(user.password);
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