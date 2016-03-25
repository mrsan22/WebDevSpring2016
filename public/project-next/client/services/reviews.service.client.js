"use strict";
(function() {
    angular
        .module("Eat'n'Review")
        .factory("ReviewService", ReviewService);

    function ReviewService($http){

        var defaultRating = [{
            title : 'Rating 3',
            description : 'I\'m editable...',
            rating : 0,
            basedOn : 5,
            starsCount : 5,
            iconClass : 'fa fa-star',
            editableRating : true,
            showGrade : false
        }];

        var ratings = [
            {
                "_id" :0,
                title : 'Rating 2',
                description : 'avana-sushi-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"avana-sushi-boston",
                "userId":234,
                rating : 1,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :1,
                title : 'Rating 2.5',
                description : 'avana-sushi-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"avana-sushi-boston",
                "userId":456,
                rating : 2.5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :2,
                title : 'Rating 3',
                description : 'pho-basil-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"pho-basil-boston",
                "userId":123,
                rating : 2.4,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :3,
                title : 'Rating 5',
                description : 'pho-basil-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"pho-basil-boston",
                "userId":234,
                rating : 5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }
        ];

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