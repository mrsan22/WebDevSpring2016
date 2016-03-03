module.exports = function(app) {
    //Declaration
    app.post("/api/project/user", findUserByCredentials);

    //Implementation
    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        res.send(200);
    }
};