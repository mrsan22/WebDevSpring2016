// Model is the module that will receive the db instance and will make connection to databases to access the information
//Making the mock data available in server side user model

var mock_reviews = require("./reviews.mock.json");
var default_review = require("./defaultReview.json");

module.exports = function (uuid) {

    var api = {
        findAllReviewsForRest : findAllReviewsForRest,
        loadDefaultRating : loadDefaultRating
    };
    return api;

    function findAllReviewsForRest(restId){
        var reviewsArray = [];
        for(var each in mock_reviews){
            console.log(mock_reviews[each]);
            console.log(mock_reviews[each].restId);
            if(mock_reviews[each].restId == restId){
                reviewsArray.push(mock_reviews[each]);
                return reviewsArray;
            }
        }
    }

    function loadDefaultRating(){
        return default_review;
    }
};