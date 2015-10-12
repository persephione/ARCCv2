angular.module('App').directive('dcCenterModal', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var width = element.width() / 2;
            element.css('margin-left', "-" + width + 'px');
        }
    };
});