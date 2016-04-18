module.exports = function (app, uuid, db, mongoose, model_user, securityService) {
    //Declaring server side user model and user service. Currently, we do not pass any parameter to user model, but
    //later on we will pass the db instance.
    var model_rest = require("./models/rest.model.server.js")(db, mongoose);
    var service_rest = require("./services/rest.service.server.js")(app, model_rest);

    //var model_user = require("./models/user.model.server.js")(uuid, db, mongoose);
    var service_user = require("./services/user.service.server.js")(app, model_user, model_rest, securityService);

    var model_reviews = require("./models/reviews.model.server.js")(uuid,db,mongoose);
    var service_reviews = require("./services/reviews.service.server.js")(app, model_reviews, model_rest);

};