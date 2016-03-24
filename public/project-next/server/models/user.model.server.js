// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model
var mock_users = require("./user.mock.json");

module.exports = function(uuid) {

    var api = {
        createUser : createUser,
        loginUser : loginUser
    };

    return api;

    function createUser(user){
        for(var i=0;i<mock_users.length;i++){
            if (mock_users[i].username == user.username){
                return null;
            }
        }
        user["_id"] = uuid.v1();
        mock_users.push(user);
        return user;
    }

    function loginUser(username, password) {
        for(var u in mock_users){
            if(mock_users[u].username == username &&
                mock_users[u].password == password){
                console.log("User exists, returning found user");
                return mock_users[u];
            }
        }
        // user not found
        console.log("user does not exist, returning null");
        return null;
    }


    
};