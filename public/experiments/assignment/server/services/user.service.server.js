module.exports = function(app, model) {

    //Declaration
    app.post("/api/assignment/login", findUserByCredentials);
    app.post("/api/assignment/user", findUserByUsername);

    //Implementation
    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function findUserByUsername(req, res){
        var username  = req.body;
        var user = model.findUserByUsername(username);
        res.json(user);
    }
};