// Model is the module that will receive the db instance and will make connection to databases to access the information
//Making the mock data available in server side user model

var mock_reviews = require("./reviews.mock.json");

module.exports = function (uuid, mongoose) {
    //load user schema
    var ReviewSchema = require("./reviews.schema.server.js")(mongoose);

    //create low level mongoose user model
    var ReviewModel = mongoose.model('EatnReview.review', ReviewSchema);

    var api = {
        findAllReviewsForRest : findAllReviewsForRest,
        addReview : addReview,
        deleteReview: deleteReview,
        updateReviewById : updateReviewById,
        findAllReviewsByUserId: findAllReviewsByUserId
    };
    return api;

    function findAllReviewsForRest(restId){
        return ReviewModel.find({'restId':restId});
    }

    function addReview(userId, restId, review){
        review.userId = userId;
        review.restId = restId;
        return ReviewModel.create(review);
    }

    function deleteReview(reviewId){
        return ReviewModel.remove({'_id':reviewId});
    }

    function updateReviewById(reviewId, review){
        delete review._id;
        review.updatedOn = Date.now();
        return ReviewModel.update({'_id':reviewId},{$set: review});
    }

    function findAllReviewsByUserId(userId){
        return ReviewModel.find({"userId":userId});
    }
};