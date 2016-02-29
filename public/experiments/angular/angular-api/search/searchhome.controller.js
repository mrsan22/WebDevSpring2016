"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("SearchHomeController", SearchHomeController);

    function SearchHomeController($scope, FourSquareService){
        //$scope.carousel = carousel;
        //function carousel(){
        //    $scope.interval= 5000 ;//changes the speed
        //}
        var imageurl_lst= [];
            FourSquareService.findPopularRestByLocation(
                function(response){
                    console.log(response);
                    //console.log(response.response.groups[0].items);
                    //console.log(response.response.groups[0].items[0].venue.photos.groups[0].items);
                    var popularRestLst = response.response.groups[0].items;
                    for (var i in popularRestLst){
                        //console.log(popularRestLst[i].venue.photos.groups[0].items[0]);
                        imageurl_lst.push(popularRestLst[i].venue.photos.groups[0].items[0].prefix+'original'
                            +popularRestLst[i].venue.photos.groups[0].items[0].suffix);

                        //console.log(imageurl_lst.length);

                        //console.log(popularRestLst[i].venue.photos.groups[0].items[0].prefix+'original'
                        //    +popularRestLst[i].venue.photos.groups[0].items[0].suffix);
                    }
                }
            );

        $scope.popularRestImages = imageurl_lst;


    }
})();