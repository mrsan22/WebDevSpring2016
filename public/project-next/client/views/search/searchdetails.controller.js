"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService, UserService){
        var vm = this;
        $scope.addReview = addReview;
        $scope.deleteReview = deleteReview;
        $scope.editReview  = editReview;
        $scope.disableEditor = disableEditor;
        $scope.save = save;
        vm.initMap = initMap;

        function init(){
            vm.restId = $routeParams.restId;

            YelpService.findRestDetailsbyId(
                vm.restId,
                function(response){
                    //console.log(response);
                    //console.log("I m in yelp service");
                    var imgurl_lst;
                    imgurl_lst = response.image_url.split("/");
                    imgurl_lst.splice(-1,1);
                    imgurl_lst.push('o.jpg');
                    vm.imageurl = imgurl_lst.join("/");
                    vm.rest = response;
                    initMap(vm.rest);
                    $scope.$apply();
                }
            );

            //ReviewService.findAllReviewsForRest(
            //    vm.restId,
            //    function(response){
            //        console.log(response);
            //        $scope.ratings = response;
            //        if($scope.user) {
            //            for (var i in $scope.ratings) {
            //                var userObj = UserService.findUserById($scope.ratings[i].userId);
            //                $scope.ratings[i]["firstName"] = userObj.firstName;
            //                $scope.ratings[i]["lastName"] = userObj.lastName;
            //            }
            //        }
            //        else{
            //            for (var i in $scope.ratings) {
            //                var userObj = UserService.findUserById($scope.ratings[i].userId);
            //                $scope.ratings[i]["firstName"] = userObj.firstName;
            //                $scope.ratings[i]["lastName"] = userObj.lastName;
            //            }
            //            //$scope.readonly = true;
            //        }
            //    }
            //);
            ReviewService
                .findAllReviewsForRest(vm.restId)
                .then(function (response) {
                    console.log(response.data);
                        vm.ratings = response.data;
                },
                    function (error) {
                       console.log(error.statusText);
                    });

                    //    for (var i in vm.ratings) {
                    //        console.log(vm.ratings[i].userId);
                    //        var userObj = UserService.findUserById(vm.ratings[i].userId);
                    //        vm.ratings[i]["firstName"] = userObj.firstName;
                    //        vm.ratings[i]["lastName"] = userObj.lastName;
                    //}
                    //else{
                    //    for (var i in $scope.ratings) {
                    //        var userObj = UserService.findUserById($scope.ratings[i].userId);
                    //        $scope.ratings[i]["firstName"] = userObj.firstName;
                    //        $scope.ratings[i]["lastName"] = userObj.lastName;
                    //    }
                    //    //$scope.readonly = true;
                    //}




            ReviewService
                .loadDefaultRating()
                .then(function (response) {
                    vm.defaultRating = response.data;
                },
                    function (error) {
                       console.log(error.statusText);
                    });

        }
        init();

        function initMap(rest) {
            var bounds = new google.maps.LatLngBounds();
            var myLatLng = {lat:rest.location.coordinate.latitude, lng:rest.location.coordinate.longitude};

           var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: myLatLng
            });

            var contentString = "Restaurant";
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });

            bounds.extend(marker.getPosition());

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }


        function addReview(rating, review, user){
            if(!user){
                user={};
                user.userId = 123;
            }
            ReviewService.addReview(
                $scope.restId,
                user.userId,
                rating,
                review,
                function (response) {
                    console.log(response);
                    ReviewService.findAllReviewsForRest(
                        $scope.restId,
                        function(response){
                            $scope.user = user;
                            $scope.ratings = response;
                                $scope.ratings[0]["firstName"] = user.firstName;
                                $scope.ratings[0]["lastName"] = user.lastName;

                        }
                    );
                }
            )
        }

        function deleteReview(ratingIndex){
            ReviewService.deleteReviewById(
                $scope.ratings[ratingIndex]._id,
                function(response){
                    ReviewService.findAllReviewsForRest(
                        $scope.restId,
                        function(response){
                            $scope.ratings = response;
                        }
                    );
                }
            )
        }
        
        function editReview(ratingIndex){
            //ReviewService.editReviewById(
            //    ratingIndex,
            //    function (response) {
            //
            //    }
            //);
            $scope.selectedreview = ratingIndex;
            $scope.editablereview = $scope.ratings[ratingIndex].description;
            $scope.temp_rating = $scope.ratings[ratingIndex].rating;
        }


        function save(reviewToEdit, ratingIndex){
            $scope.ratings[ratingIndex].description = reviewToEdit;
            //$scope.disableEditor();
            $scope.selectedreview = -1;
            //$scope.createdOn = Date.now();
            //$scope.latestDate = true;
        }

        function disableEditor(ratingIndex){
            $scope.selectedreview = -1;
            $scope.ratings[ratingIndex].rating = $scope.temp_rating;
            $scope.sameDate = true;

        }
    }

})();