module.exports = function(app) {

    //Declaring server side user model and user service. Currently, we do not pass any parameter to user model, but
    //later on we will pass the db instance.
    var model = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, model);
};