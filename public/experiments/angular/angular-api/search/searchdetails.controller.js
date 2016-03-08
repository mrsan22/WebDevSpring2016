"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, $interval){
        $scope.restId = $routeParams.restId;

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
                title : 'Rating 1',
                description : 'I\'m not editable but update myself with a timer...',
                rating : 3.5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-mortar-board',
                editableRating : false,
                showGrade : true
            }, {
                title : 'Rating 2',
                description : 'I\'m not editable...',
                rating : 1,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : true
            }, {
                title : 'Rating 3',
                description : 'I\'m editable...',
                rating : 0,
                basedOn : 5,
                starsCount : 10,
                iconClass : 'fa fa-star',
                editableRating : true,
                showGrade : true
            }, {
                title : 'Rating 4',
                description : 'I\'m editable with a weird icon...',
                rating : 2.5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-send',
                editableRating : true,
                showGrade : true
            }, {
                title : 'Rating 5',
                description : 'I\'m editable and a lot larger than my neighbours...',
                rating : 33,
                basedOn : 100,
                starsCount : 20,
                iconClass : 'fa fa-star',
                editableRating : true,
                showGrade : true
            }];
            //$interval(function() {
            //    $scope.ratings[0].rating = Math.round(Math.random()*5*100) / 100;
            //}, 1000);
        }
        init();

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