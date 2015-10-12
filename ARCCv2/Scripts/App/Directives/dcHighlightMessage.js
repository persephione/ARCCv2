angular.module('App').directive('dcHighlightMessage', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            message: '=dcHighlightMessage'
        },
        link: function (scope, element, attrs) {
            var template = scope.message.replace(new RegExp("/%", 'g'), "<span class='text-info'>");
            template = template.replace(new RegExp("%/", 'g'), "</span>");
            element.html(template);
            $compile(element.contents())(scope);
        }
    };
}]);