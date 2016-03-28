// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model
var mock_users = require("./user.mock.json");

module.exports = function(uuid, db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create low level mongoose user model
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        loginUser : loginUser,
        findUserByUsername : findUserByUsername,
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        updateUserById : updateUserById,
        deleteUserById : deleteUserById,
        createAndFindAllUsers : createAndFindAllUsers
    };
    return api;

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {'username': credentials.username,
                'password' : credentials.password}
        );
    }

    function loginUser(username, password) {
        return UserModel.findOne(
            {'username': username,
                'password' : password}
        );
    }

    function findUserByUsername(username){
        return UserModel.findOne({'username' : username});
    }

    function createUser(user){
        return UserModel.create(user);
    }

    function findAllUsers(){
        return UserModel.find();
    }

    function findUserById(userid){
        return UserModel.findById({'_id': userid});
    }

    function deleteUserById(userId){
        return UserModel.remove({'_id': userId});
    }

    function updateUserById(userid, userObj){
        for (var each in mock_users){
            if (mock_users[each]._id == userid){
                mock_users[each] = userObj;
                return (mock_users);
            }
        }
    }

    function createAndFindAllUsers(user){
        for(var i=0;i<mock_users.length;i++){
            if (mock_users[i].username == user.username){
                return null;
            }
        }
        user["_id"] = uuid.v1();
        mock_users.push(user);
        return mock_users;
    }


};