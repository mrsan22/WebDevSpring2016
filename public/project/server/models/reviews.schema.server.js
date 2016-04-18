module.exports = function (mongoose) {

    var ReviewSchema = mongoose.Schema({
        title:{type:String},

        review:{type:String},

        restId:{type:String},

        userId:{type:String},

        rating:{type:Number, min:0, max:5},

        createdOn:{type:Date, default:Date.now},

        updatedOn:{type:Date, default:Date.now},

        flag:{type:Boolean, default:false}

    }, {collection:"EatnReview.review"});
    return ReviewSchema;
};