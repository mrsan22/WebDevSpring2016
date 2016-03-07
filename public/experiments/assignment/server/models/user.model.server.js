// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model
var mock_users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername : findUserByUsername,
        createUser : createUser
    };
    return api;

    function findUserByCredentials(credentials) {
        for(var u in mock_users){
            if(mock_users[u].username == credentials.username &&
                mock_users[u].password == credentials.password){
                console.log("User exists, returning found user");
                return mock_users[u];
            }
        }
        // user not found
        console.log("user does not exist, returning null");
        return null;
    }

    function findUserByUsername(username){
        for(var u in mock_users){
            if(mock_users[u].username == username){
                return mock_users[u];
            }
        }
        // user not found
        console.log("user not found by username, returning null");
        return null;
    }

    function createUser(user){
        for(var i=0;i<mock_users.length;i++){
            if (mock_users[i].username == user.username){
                return null;
            }
        }
        user["_id"] = (new Date).getTime();
        mock_users.push(user);
        return user;
    }
};