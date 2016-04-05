// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model
var mock_users = require("./user.mock.json");

module.exports = function(uuid,db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create low level mongoose user model
    var UserModel = mongoose.model('EatnReview.user', UserSchema);

    var api = {
        createUser : createUser,
        loginUser : loginUser,
        updateUserById: updateUserById,
        findUserById : findUserById,
        findUserByCredentials: findUserByCredentials,
        findAllUsers : findAllUsers,
        findUserByUsername : findUserByUsername,
        deleteUserById : deleteUserById,
        createAndFindAllUsers : createAndFindAllUsers
    };

    return api;

    function createUser(user){
        return UserModel.create(user);
    }

    function loginUser(username, password) {
        //for(var u in mock_users){
        //    if(mock_users[u].username == username &&
        //        mock_users[u].password == password){
        //        console.log("User exists, returning found user");
        //        return mock_users[u];
        //    }
        //}
        //// user not found
        //console.log("user does not exist, returning null");
        //return null;
        return UserModel.findOne(
            {
                'username': username,
                'password': password
            }
        );
    }

    function updateUserById(userid, userObj){
        for (var each in mock_users){
            if (mock_users[each]._id == userid){
                mock_users[each] = userObj;
                return;
            }
        }
    }

    function findUserById(userid){
        //for(var u in mock_users){
        //    if(mock_users[u]._id == userid){
        //        return mock_users[u];
        //    }
        //}
        //// user not found
        //console.log("user not found by Id, returning null");
        //return null;
        return UserModel.findById({'_id': userid});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({'username': username});
    }

    //function findUserByCredentials(credentials) {
    //    for(var u in mock_users){
    //        if(mock_users[u].username == credentials.username &&
    //            mock_users[u].password == credentials.password){
    //            console.log("User exists, returning found user");
    //            return mock_users[u];
    //        }
    //    }
    //    // user not found
    //    console.log("user does not exist, returning null");
    //    return null;
    //}
    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                'username': credentials.username,
                'password': credentials.password
            }
        );
    }


    function findAllUsers(){
        return UserModel.find();
    }

    function deleteUserById(userId){
        for (var each in mock_users){
            if (mock_users[each]._id == userId){
                mock_users.splice(each,1);
                return;
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