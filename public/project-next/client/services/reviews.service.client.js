"use strict";
(function() {
    angular
        .module("Eat'n'Review")
        .factory("ReviewService", ReviewService);

    function ReviewService($http){

        //Declaration of interface
        var reviewsServiceApi = {
          //findAllReviewsForUser : findAllReviewsForUser
            findAllReviewsForRest : findAllReviewsForRest,
            addReview : addReview,
            deleteReviewById : deleteReviewById,
            updateReviewById : updateReviewById
        };

        return reviewsServiceApi;

        //Implementation of interfaces
        function findAllReviewsForRest(restId){
            return $http.get("/api/project/getReviews"+restId);
        }

        function addReview(restId, userId, review){
            return $http.post("/api/project/user/"+userId+"/rest/"+restId, review);
        }

        function deleteReviewById(restId, reviewId){
            return $http.delete("/api/project/rest/"+restId+"/review/"+reviewId);
        }

        function updateReviewById(restId, reviewId, review){
            return $http.put("/api/project/rest/"+restId+"/review/"+reviewId, review);
        }

    }

})();