module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        city: String,
        roles: [String]
        // collection property sets
        // collection name to 'userInfo'
    }, {collection: 'userInfo'});
    return UserSchema;
};