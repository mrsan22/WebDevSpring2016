module.exports = function(app) {

    //Declaring server side user model and user service. Currently, we do not pass any parameter to user model, but
    //later on we will pass the db instance.
    var model_user = require("./models/user.model.server.js")();
    var service_user = require("./services/user.service.server.js")(app, model_user);

    var model_form = require("./models/form.model.server.js")();
    var service_forms  = require("./services/forms.service.server.js")(app, model_form);
};