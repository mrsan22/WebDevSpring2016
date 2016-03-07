module.exports = function(app, model) {

    //Declaration
    app.post("/api/assignment/login", findUserByCredentials);
    app.post("/api/assignment/user", findUserByUsername);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

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
};