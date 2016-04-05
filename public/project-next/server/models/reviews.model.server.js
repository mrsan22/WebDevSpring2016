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
        getAvgRatingRest: getAvgRatingRest
    };
    return api;

    function findAllReviewsForRest(restId){
        //var reviews=[];
        //for(var each in mock_reviews){
        //    if(mock_reviews[each].restId == restId){
        //        reviews.push(mock_reviews[each]);
        //    }
        //}
        //return reviews;
        return ReviewModel.find({'restId':restId});
    }

    function addReview(userId, restId, review){
        //review._id = uuid.v1();
        review.userId = userId;
        review.restId = restId;

        //mock_reviews.unshift(review);
        return ReviewModel.create(review);
    }

    function deleteReview(reviewId){
        //for (var each in mock_reviews){
        //    if(mock_reviews[each]._id == reviewId){
        //        mock_reviews.splice(each, 1);
        //    }
        //}
        return ReviewModel.remove({'_id':reviewId});
    }

    function updateReviewById(reviewId, review){
        //for(each in mock_reviews){
        //    if(mock_reviews[each]._id == reviewId){
        //        review.createdOn = Date.now();
        //        mock_reviews[each] = review;
        //    }
        //}
        delete review._id;
        review.updatedOn = Date.now();
        return ReviewModel.updateReviewById({'_id':reviewId},{$set: review});
    }

    function getAvgRatingRest(restId){
        var avgRating = 0;
        var reviews = findAllReviewsForRest(restId);
        for(var each in reviews){
            avgRating += reviews[each].rating;
        }
        return (avgRating / reviews.length);
    }
};