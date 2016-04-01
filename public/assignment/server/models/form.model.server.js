// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side form model
//var mock_forms = require("./forms.mock.json");

module.exports = function(uuid, db, mongoose){

    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create low level mongoose form model
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        updateFormById : updateFormById,
        findFormById : findFormById,
        deleteFormById : deleteFormById,
        getMongooseModel : getMongooseModel
    };

    return api;

    function getMongooseModel(){
        return FormModel;
    }

    function createFormForUser(userid, formObj){
        return FormModel.create(
            {"userId": userid, "title":formObj.title, "fields":[], "created":Date.now(), "updated":Date.now()}
        );
    }

    function findAllFormsForUser(userid){
        return FormModel.find({'userId': userid});
    }

    function updateFormById(formid, formObj){
        return FormModel.update(
            {'_id': formid},
            {"userId": formObj.userId, "title":formObj.title,
                "created": formObj.created, updated: Date.now(), "fields": formObj.fields, "__v": formObj.__v});
    }

    function findFormById(formid){
        return FormModel.findById({'_id': formid});
    }

    function deleteFormById(formid){
        return FormModel.remove({'_id': formid});
    }

};