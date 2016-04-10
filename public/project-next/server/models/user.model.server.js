// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side user model
//var mock_users = require("./user.mock.json");

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
        addLike : addLike,
        isLiked: isLiked,
        unLike: unLike,
        followers: followers,
        following: following,
        isFollowed: isFollowed,
        removeFromFollowers: removeFromFollowers,
        removeFromFollowing: removeFromFollowing,
        getFollowersDetails: getFollowersDetails
    };

    return api;

    function createUser(user){
        return UserModel.create(user);
    }

    function loginUser(username, password) {
        return UserModel.findOne(
            {
                'username': username,
                'password': password
            }
        );
    }

    function updateUserById(userid, userObj){
        delete userObj._id;
        return UserModel.update(
            {'_id': userid},
            {
                $set: userObj
            }
        );
    }

    function findUserById(userid){
        return UserModel.findById({'_id': userid});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({'username': username});
    }

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
        return UserModel.remove({'_id': userId});
    }

    function addLike(userId, restId){
        return UserModel.update(
            {'_id': userId},
            {
                $addToSet :{'likes':restId}
            }
        );
    }

    function isLiked(userId, restId){
        return UserModel.findOne({_id: userId, likes: {$in: [restId]}});
    }
    function unLike(userId, restId){
        return UserModel.update(
            {'_id':userId},
            {
                $pullAll: {likes: [restId]}
            }
        );
    }

    function followers(userId, currentUserId){
        return UserModel.update(
            {'_id': userId},
            {
                $addToSet :{'followers':currentUserId}
            }
        );
    }

    function following(userId, currentUserId){
        return UserModel.update(
            {'_id': currentUserId},
            {
                $addToSet :{'following':userId}
            }
        );
    }

    function isFollowed(userId, currentUserId){
        return UserModel.findOne({_id: userId, followers: {$in: [currentUserId]}});
    }

    function removeFromFollowers(userId, currentUserId){
        return UserModel.update(
            {'_id':userId},
            {
                $pullAll: {followers: [currentUserId]}
            }
        );
    }

    function removeFromFollowing(userId, currentUserId){
        return UserModel.update(
            {'_id':currentUserId},
            {
                $pullAll: {following: [userId]}
            }
        );
    }

    function getFollowersDetails(followersList){
        return UserModel.find({'_id':{$in:followersList}});
    }


};