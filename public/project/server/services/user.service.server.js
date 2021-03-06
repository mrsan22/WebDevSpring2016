"use strict";
module.exports = function (app, model_user, model_rest, securityService) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../../../public/uploads' });
    var bcrypt = require('bcrypt-nodejs');

    //var securityService = require("../../../Common-service/security.js")(model_user);
    var passport = securityService.getPassport();

    //Declaration
    var auth  = authorized;
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/user",auth, user);
    app.post("/api/project/user/login", passport.authenticate('project'),login);
    app.post("/api/project/login", findUserByCredentials);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:userId", updateUserById);
    app.get("/api/project/user/:userid", findUserById);
    app.delete("/api/project/user/:userid", auth, deleteUserById);
    app.post("/api/project/admin-user", auth, createAndFindAllUsers);
    app.put("/api/project/userupdate/:userId",auth, updateUserByIdNoSession);
    app.put("/api/project/user/:userId/rest/:restId/like", addLike);
    app.get("/api/project/user/:userId/rest/:restId/isLiked", isLiked);
    app.delete("/api/project/user/:userId/rest/:restId/unLike", unLike);
    app.put("/api/project/user/:currentUserId/follows/:userId", followUser);
    app.get("/api/project/user/:userId/followedBy/:currentUserId",isFollowed);
    app.delete("/api/project/user/:currentUserId/unfollows/:userId", unFollowUser);
    app.get("/api/project/user/getFollowersDetails/:userId", getFollowersDetails);
    app.get("/api/project/user/getFollowingDetails/:userId", getFollowingDetails);
    app.get("/api/project/user/getLikeDetails/:userId", getLikesforUser);
    app.post("/api/project/user/:userId",upload.single('profilePic'), uploadUserImage);

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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res){
        var currentUser = req.user;
        res.json(currentUser);
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
        console.log(user);
        model_user.findUserByUsername(user.username)
            .then(function (response) {
                    if(response == null){
                        return model_user.createUser(user);
                    }
                    else{
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

    function loggedin(req, res){
        res.send(req.isAuthenticated() && req.user.type == 'project'? req.user : null);
    }

    function loginUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        model_user
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
        model_user
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
        model_user
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

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function updateUserById(req, res){
        var userid = req.params.userId;
        var userObj = req.body;
        model_user
            .updateUserById(userid, userObj)
            .then(function (response) {
                    //console.log(response);
                    //res.send(200);
                    return model_user.findUserById(userid);
                },
                function (error) {
                    res.status (400).send ("Error in updating user by Id", error.statusText);
                })
            .then(function (response) {
                    if(response != null) {
                        //req.session.currentUser = response;
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

    function uploadUserImage(req, res){
        var userId = req.params.userId;
        var userObj = req.body;
        var profilePic = req.file;

        if(profilePic) {

            var destination = profilePic.destination;
            var path = profilePic.path;
            var originalname = profilePic.originalname;
            var size = profilePic.size;
            var mimetype = profilePic.mimetype;
            var filename = profilePic.filename;
            userObj.imgUrl = "/uploads/" + filename;
        }
        model_user
            .updateUserById(userId, userObj)
            .then(function (response) {
                    //console.log(response);
                    //res.send(200);
                    return model_user.findUserById(userId);
                },
                function (error) {
                    res.status (400).send ("Error in updating user by Id", error.statusText);
                })
            .then(function (response) {
                    if(response != null) {
                        req.session.currentUser = response;
                        res.redirect(req.header('Referer') + "#/" + userId + "/profile");
                        //res.json(response);
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
    function updateUserByIdNoSession(req, res){
        if(isAdmin(req.user)) {
            var userid = req.params.userId;
            var userObj = req.body;
            model_user
                .findUserByUsername(userObj.username)
                .then(function (response) {
                        if (response == null || response.username == userObj.username) {
                            return model_user.updateUserById(userid, userObj);
                        }
                        else {
                            console.log("username already exists");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.send("Error in finding user by username", error.statusText);
                    })
                .then(function (response) {
                        //console.log(response);
                        //res.send(200);
                        return model_user.findUserById(userid);
                    },
                    function (error) {
                        res.status(400).send("Error in updating user by Id", error.statusText);
                    })
                .then(function (response) {
                        if (response != null) {
                            //if (req.session.currentUser._id == userid) {
                            //    req.session.currentUser = response;
                            //}
                            console.log(response);
                            res.json(response);
                        }
                        else {
                            console.log("User not found by Id after updating the user, returning null");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.status(400).send("Error in findUserById function after updating the user", error.statusText);
                    });
        }
        else{
            res.status(403).send("Not authorized to be admin");
        }
    }

    function deleteUserById(req, res){
        if(isAdmin(req.user)) {
            var userId = req.params.userid;
            model_user
                .deleteUserById(userId)
                .then(function (response) {
                        //res.send(200);
                        return model_user.findAllUsers();
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

    function addLike(req, res){
        var userId = req.params.userId;
        var restId = req.params.restId;
        model_user
            .addLike(userId, restId)
            .then(function (response) {
                res.json(200);

            }, function (error) {
                res.status (400).send ("Error in adding likes to User", error.statusText);
            })
    }

    function isLiked(req, res){
        var userId = req.params.userId;
        var restId = req.params.restId;
        model_user
            .isLiked(userId, restId)
            .then(function (response) {
                res.json(response);
            },
                function (error) {
                    res.status (400).send ("Error in retrieving liked rest by user", error.statusText);
                })
    }

    function unLike(req, res){
        var userId = req.params.userId;
        var restId = req.params.restId;
        model_user
            .unLike(userId, restId)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in retrieving liked rest by user", error.statusText);
                })
    }

    //Follow
    function followUser(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        model_user
            .followers(userId, currentUserId)//Add currently loggedin user into userid(whose profile currently loggedin
            //visits) followers list
            .then(function (response) {
                //res.json(200);
                return model_user.following(userId, currentUserId);//Add userid of that user whom currently loggedin user
                //is following into currently loggedin user following list
            }, function (error) {
                res.status (400).send ("Error in adding currently loggedin user into userid's follower list", error.statusText);
            })
            .then(function (response) {
                res.json(200);
            }, function (error) {
                res.status (400).send ("Error in adding currently loggedin user into userid's follower list", error.statusText);
            })



    }
    //Check followers of the userId, whose profile currently logged in user visits.
    function isFollowed(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        model_user
            .isFollowed(userId, currentUserId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status (400).send ("Error in checking if followers list has currently " +
                    "loggedin user's userId", error.statusText);
            })
    }

    function unFollowUser(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        model_user
            .removeFromFollowers(userId, currentUserId)//Remove currently loggedin user from userid(whose profile currently loggedin
        //visits) followers list
            .then(function (response) {
                //res.json(200);
                return model_user.removeFromFollowing(userId, currentUserId);//Remove userid of that user whom currently loggedin user
                //is following
            }, function (error) {
                res.status (400).send ("Error in removing currently loggedin user from " +
                    "userid's follower list", error.statusText);
            })
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status (400).send ("Error in removing userId from currently " +
                    "logged in user's following list", error.statusText);
            })
    }

    function getFollowersDetails(req, res){
        var userId = req.params.userId;
        model_user
            .findUserById(userId)
            .then(function (response) {
                    if(response != null) {
                        //if(req.session.currentUser._id == userId) {
                        //    req.session.currentUser = response;
                        //}
                        return model_user.getFollowersDetails(response.followers);
                    }
                    else{
                        console.log("User not found by Id, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function", error.statusText);
                })
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send("Error in getting followers list of currently logged in user", error.statusText);
            })
    }

    function getFollowingDetails(req, res){
        var userId = req.params.userId;
        model_user
            .findUserById(userId)
            .then(function (response) {
                    if(response != null) {
                        return model_user.getFollowingDetails(response.following);
                    }
                    else{
                        console.log("User not found by Id, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function", error.statusText);
                })
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send("Error in getting following list of currently logged in user", error.statusText);
            })
    }

    function getLikesforUser(req, res){
        var userId = req.params.userId;
        model_user
            .findUserById(userId)
            .then(function (response) {
                if(response != null){
                    //console.log(response);
                    return model_rest.findAllRest(response.likes);
                }
            }, function (error) {
                res.status (400).send ("Error in findUserById function in getLikes function", error.statusText);
            })
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send("Error in getting likes list for routeparams user", error.statusText);
            })
    }

    function isAdmin(user){
        if(user.role == 'Admin'){

            return true;
        }
        else{
            return false;
        }
    }

    //For admin
    function createAndFindAllUsers(req, res){
        var user = req.body;
        if(isAdmin(req.user)) {
            model_user
                .findUserByUsername(user.username)
                .then(function (response) {
                        if (response == null) {
                            return model_user.createUser(user);
                        }
                        else {
                            console.log("username already exists");
                            res.json(null);
                        }
                    },
                    function (error) {
                        res.send("Error in finding user by username", error.statusText);
                    })
                .then(function (response) {
                        return model_user.findAllUsers();
                    },
                    function (error) {
                        res.status(400).send("Error inserting User Info in database", error.statusText);
                    })
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
};