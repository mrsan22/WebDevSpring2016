// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model

module.exports = function (uuid, db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create low level mongoose user model
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        loginUser: loginUser,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        getMongooseModel:getMongooseModel
    };
    return api;

    function getMongooseModel(){
        return UserModel;
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                'username': credentials.username,
                'password': credentials.password
            }
        );
    }

    function loginUser(username, password) {
        return UserModel.findOne(
            {
                'username': username,
                'password': password
            }
        );
    }

    function findUserByUsername(username) {
        return UserModel.findOne({'username': username});
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function findUserById(userid) {
        return UserModel.findById({'_id': userid});
    }

    function deleteUserById(userId) {
        return UserModel.remove({'_id': userId});
    }

    function updateUserById(userid, userObj) {
        delete userObj._id;
        var emails = userObj.emails.toString().split(",");
        var phones = userObj.phones.toString().split(",");
        userObj.emails = emails;
        userObj.phones = phones;
        return UserModel.update(
            {'_id': userid},
            {
                $set: userObj
            }
        );
    }

};