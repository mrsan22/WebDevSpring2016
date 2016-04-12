"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');

module.exports = function(app, model) {

    //var userModel = require('./user.model.server.js');
    //var UserModel = userModel.getMongooseModel();

    //Declaration
    var auth = authorized;
    app.post("/api/assignment/login", findUserByCredentials);
    //app.get("/api/assignment/user?[username=username&password=password]", loginUser);
    //app.get("/api/assignment/user?[username=username]", findUserByUsername);
    app.post("/api/assignment/user",passport.authenticate('local'),user);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    //app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:userid", findUserById);
    app.delete("/api/assignment/user/:userid", deleteUserById);
    app.put("/api/assignment/user/:userId", updateUserById);

    //new declaration
    // creates a new user and returns array of all users
    app.post("/api/assignment/adminuser", createUser);

    //Implementation of passport functions
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        model
            .findUserByCredentials({username:username, password:password})
            .then(function (user) {
                    if(!user) {
                        return done(null, false);//done(error, user)
                    }
                    else{
                        console.log("user found, logging in user");
                        return done(null, user);
                    }
                },
                function (error) {
                    if(error){
                        return done(error);
                    }
                });

    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    //encryption of cookie. What goes to client.
    function serializeUser(user, done) {
        done(null, user);
    }

    //decrypt cookie info
    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
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
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res){
        req.logOut();
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