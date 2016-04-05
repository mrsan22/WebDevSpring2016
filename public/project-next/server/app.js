module.exports = function (app, uuid, db, mongoose) {
    //Declaring server side user model and user service. Currently, we do not pass any parameter to user model, but
    //later on we will pass the db instance.
    var model_user = require("./models/user.model.server.js")(uuid, db, mongoose);
    var service_user = require("./services/user.service.server.js")(app, model_user);

    var model_reviews = require("./models/reviews.model.server.js")(uuid,db,mongoose);
    var service_reviews = require("./services/reviews.service.server.js")(app, model_reviews);
};