"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService){

        function init(){
            $scope.restId = $routeParams.restId;
            ReviewService.findAllReviewsForRest(
                $scope.restId,
                function(response){
                    $scope.reviews = response;
                }
            );
        }
        init();

        YelpService.findRestDetailsbyId(
            $scope.restId,
            function(response){
                var imgurl_lst;
                imgurl_lst = response.image_url.split("/");
                imgurl_lst.splice(-1,1);
                imgurl_lst.push('o.jpg');
                $scope.imageurl = imgurl_lst.join("/");
                $scope.rest = response;
                $scope.$apply();
            }
        )
    }

})();