// Model is the module that will receive the db instance and will make connection to databases to access the information

//Making the mock data available in server side form model
var mock_forms = require("./forms.mock.json");

module.exports = function(){
    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser

    };

    return api;

    function createFormForUser(formObj){
        for(var i=0;i<mock_forms.length;i++){
            if (mock_forms[i].title == formObj.formObj.title){
                return null;
            }
        }
         var id = (new Date).getTime();
        var newForm = {
            "_id" : id,
            "userId" : formObj.userId,
            "title" : formObj.formObj["title"]
        };
        mock_forms.push(newForm);
        return newForm;
    }

    function findAllFormsForUser(userid){
            var formsArray = [];
            for (each in mock_forms){
                if(mock_forms[each].userId == userid){
                    formsArray.push(mock_forms[each]);
                }
            }
        return formsArray;
    }
};