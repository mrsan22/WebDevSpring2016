"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (userAssignmentModel, userProjectModel) {
    passport.use('assignment', new LocalStrategy(assignmentStrategy));
    passport.use('project', new LocalStrategy(projectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport
    };

    return api;

    function assignmentStrategy(username, password, done) {
        userAssignmentModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log("I am here assignment");
                        console.log(user);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function projectStrategy(username, password, done) {
        userProjectModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log("I am here project");
                        console.log(user);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user.type === 'assignment'){
            userAssignmentModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        console.log("desearliaze assignment user");
                        console.log(user);
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }

        else if(user.type === 'project'){
            userProjectModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        console.log("desearliaze projecr user");
                        console.log(user);
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function getPassport() {
        return passport;
    }
};
