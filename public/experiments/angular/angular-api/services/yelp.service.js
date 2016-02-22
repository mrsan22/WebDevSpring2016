(function () {
    angular
        .module("RestApp")
        .factory("YelpService",yelpService);

    function yelpService($http){
        var api = {
            findRestbyNameLocation: findRestbyNameLocation,
            //findRestbyLocation: findRestbyLocation
        };
        return api;

        function findRestbyNameLocation(restname, location, callback){
            if(!restname){
                restname="";
            }
            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            parameters = [];
            parameters.push(['term', restname]);
            parameters.push(['location', location]);
            parameters.push(['limit', 10]);
            parameters.push(['category_filter', 'restaurants']);
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            $http.jsonp(message.action, {params: parameterMap}).success(callback);

        }

    }
})();