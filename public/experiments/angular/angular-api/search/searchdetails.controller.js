"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, $interval){
        $scope.restId = $routeParams.restId;
        $scope.addReview = addReview;

        function init(){
            $scope.defaultRating = [{
                title : 'Rating 3',
                description : 'I\'m editable...',
                rating : 0,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : true,
                showGrade : false
            }];

            $scope.ratings = [{
                title : 'Rating 2',
                description : 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                ' ante sollicitudin commodo.',
                rating : 1,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }, {
                title : 'Rating 2',
                description : 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ' +
                'ante sollicitudin commodo.',
                rating : 2,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }, {
                title : 'Rating 2',
                description : 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                ' ante sollicitudin commodo.',
                rating : 3.5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }, {
                title : 'Rating 2',
                description : 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                ' ante sollicitudin commodo.',
                rating : 5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }];
            //$interval(function() {
            //    $scope.ratings[0].rating = Math.round(Math.random()*5*100) / 100;
            //}, 1000);

        }
        init();

        function addReview(rating, review){
            console.log(rating);
            console.log(review);
            $scope.ratings.unshift({
                title : 'Rating',
                description : review,
                rating : rating,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: Date.now()
            });
        }

        YelpService.findRestDetailsbyId(
            $scope.restId,
            function(response){
                console.log(response);
                $scope.rest = response;
                $scope.$apply();
            }
        )

    }
})();