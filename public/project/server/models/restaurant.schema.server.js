module.exports = function (mongoose) {

    var restSchema = mongoose.Schema({
        '_id': String,
        'name': String,
        'imageUrl': String
    }, {collection:'EatnReview.restaurant'});
    return restSchema;
};