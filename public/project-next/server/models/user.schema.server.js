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

        profilePic:{ data: Buffer, contentType: String },

        role: {type:String,enum:["USER","ADMIN"]},

        followers:{type: [String], default: []},

        following:{type: [String], default: []},

        likes:{type: [String], default: []},

        favorite:{type: [String], default: []}

    }, {collection: 'EatnReview.user'});
    return UserSchema;
};