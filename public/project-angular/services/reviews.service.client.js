"use strict";
(function() {
    angular
        .module("Eat'n'Review")
        .factory("ReviewService", ReviewService);

    function ReviewService(){
        var reviews = [
            {"_id" :0, "title":"I am Review", "description":"Review the review so that reviews is seen1",
            restId:"avana-sushi-boston", "userId":234, "createdOn":1397490980837},

            {"_id" :1, "title":"I am Review", "description":"Review the review so that reviews is seen1",
                "restId":"pho-basil-boston","userId":123, "createdOn":1397490980837},

            {"_id" :2, "title":"I am Review", "description":"Review the review so that reviews is seen2",
            "restId":"avana-sushi-boston", "userId":234, "createdOn":1397490980837},

            {"_id" :3, "title":"I am Review", "description":"Review the review so that reviews is seen2",
            "restId":"pho-basil-boston","userId":234, "createdOn":1397490980837},

            {"_id" :4, "title":"I am Review", "description":"Review the review so that reviews is seen1",
            "restId":"chutneys-boston-4","userId":123, "createdOn":1397490980837}
        ];

        //Declaration of interface
        var reviewsServiceApi = {
          //findAllReviewsForUser : findAllReviewsForUser
            findAllReviewsForRest : findAllReviewsForRest
        };

        return reviewsServiceApi;

        //Implementation of interfaces
        function findAllReviewsForRest(restId, callback){
            var reviewsArray = [];
            for(var each in reviews){
                if(reviews[each].restId == restId){
                    reviewsArray.push(reviews[each]);
                    //console.log("All reviews for this restaurant", reviewsArray);
                }
            }
            callback(reviewsArray);
        }

    }

})();