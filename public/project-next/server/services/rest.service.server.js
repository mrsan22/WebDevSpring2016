"use strict";
module.exports = function (app, model_rest) {
    app.post("/api/project/restaurant", addRest);

    function addRest(req, res){
        var rest = req.body;
        var imgurl_lst;
        imgurl_lst = rest.image_url.split("/");
        imgurl_lst.splice(-1,1);
        imgurl_lst.push('o.jpg');
        var imageurl = imgurl_lst.join("/");
        rest.image_url = imageurl;
        model_rest
            .addRest(rest)
            .then(function (resposne) {
                res.json(resposne);

            }, function (error) {
                res.status (400).send ("Error in adding restaurant to restaurant collection", error.statusText);
            })
    }
};