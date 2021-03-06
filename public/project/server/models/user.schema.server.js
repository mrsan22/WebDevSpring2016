module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: {type:String, required:true},

        password: {type:String, required:true},

        firstName: {type:String},

        lastName: {type:String},

        email: {type:String},

        city: {type:String},

        created:{type: Date, default: Date.now},

        imgUrl:{type:String},

        type:{type:String, default:"project"},

        role: {type:String,enum:["User","Admin"], default:"User"},

        followers:{type: [String], default: []},//Has userIds of those users which are followers of current user

        following:{type: [String], default: []},// Has userIds of those user that current user is following

        likes:{type: [String], default: []},

        favorite:{type: [String], default: []}

    }, {collection: 'EatnReview.user'});
    return UserSchema;
};