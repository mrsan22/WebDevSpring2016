"use strict";
(function() {
    angular
        .module("Eat'n'Review")
        .factory("ReviewService", ReviewService);

    function ReviewService(){
        var reviews = [
            {}
        ]
    }
})();