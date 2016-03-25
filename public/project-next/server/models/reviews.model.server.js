// Model is the module that will receive the db instance and will make connection to databases to access the information
//Making the mock data available in server side user model

var mock_reviews = require("./reviews.mock.json");

module.exports = function (uuid) {

    var api = {
        findAllReviewsForRest : findAllReviewsForRest,
        addReview : addReview,
        deleteReview: deleteReview,
        updateReviewById : updateReviewById
    };
    return api;

    //function findAllReviewsForRest(restId){
    //    var reviews = mock_reviews.filter(function (review, index, array){
    //       return (review.restId == restId);
    //    });
    //    console.log(reviews);
    //    return reviews;
    //}

    function findAllReviewsForRest(restId){
        var reviews=[];
        for(var each in mock_reviews){
            if(mock_reviews[each].restId == restId){
                reviews.push(mock_reviews[each]);
            }
        }
        return reviews;
    }

    function addReview(userId, restId, review){
        review._id = uuid.v1();
        review.userId = userId;
        review.restId = restId;

        mock_reviews.unshift(review);
        return;
    }

    function deleteReview(reviewId){
        for (var each in mock_reviews){
            if(mock_reviews[each]._id == reviewId){
                mock_reviews.splice(each, 1);
            }
        }
        return;
    }

    function updateReviewById(reviewId, review){
        for(each in mock_reviews){
            if(mock_reviews[each]._id == reviewId){
                mock_reviews[each] = review;
            }
        }
        return;
    }

};