module.exports = function(app, uuid, db, mongoose) {

    //Declaring server side user model and user service. Currently, we do not pass any parameter to user model, but
    //later on we will pass the db instance.
    var model_user = require("./models/user.model.server.js")(uuid, db, mongoose);
    var service_user = require("./services/user.service.server.js")(app, model_user);

    var model_form = require("./models/form.model.server.js")(uuid, db, mongoose);
    var service_forms  = require("./services/forms.service.server.js")(app, model_form);

    var model_field = require("./models/field.model.server.js")(uuid, db, mongoose);
    var service_field = require("./services/field.service.server.js")(app, model_field);
};