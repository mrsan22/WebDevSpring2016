module.exports = function(app, model) {
    //Declaration
    app.post("/api/assignment/user", findUserByCredentials);

    //Implementation
    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }
};