"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("SearchHomeController", SearchHomeController);

    function SearchHomeController($scope, FourSquareService){

        function init(){
            $('#carousel').carousel({
                interval: 5000 //changes the speed
            })
        }
        init();
        var imageurl_lst= [];
            FourSquareService.findPopularRestByLocation(
                function(response){
                    console.log(response);
                    //console.log(response.response.groups[0].items[0].venue.photos.groups[0].items);
                    var popularRestLst = response.response.groups[0].items;
                    for (var i in popularRestLst){
                        //console.log(popularRestLst[i].venue.photos.groups[0].items[0]);
                        imageurl_lst.push(popularRestLst[i].venue.photos.groups[0].items[0].prefix+'original'
                            +popularRestLst[i].venue.photos.groups[0].items[0].suffix);
                    }
                }
            );

        $scope.popularRestImages = imageurl_lst;


    }
})();