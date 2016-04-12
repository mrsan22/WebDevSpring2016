"use strict";
(function () {
    angular
        .module("sortableField", [])
        .directive("sortableField", sortableField);

    function sortableField(FieldService){
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var fieldAxis = attributes.fieldAxis;
            $(element).sortable({
                axis: fieldAxis,
                handle :".dragButton",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var formId = scope.model.formId;
                    var userId = scope.model.userId;
                    //var temp = scope.users[start];
                    //scope.users[start] = scope.users[end];
                    //scope.users[end] = temp;
                    FieldService
                        .sortFields(formId, start, end)
                        .then(function (response) {

                        },
                            function (error) {
                                console.log(error.statusText);
                            });
                    //scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();