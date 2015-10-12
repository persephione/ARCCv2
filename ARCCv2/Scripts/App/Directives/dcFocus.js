// http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
// see focus.js
angular.module('App').directive('dcFocus', ['$timeout', function ($timeout) {
    return function (scope, elem, attr) {
        scope.$on('dcFocus', function (e, name) {
            if (name === attr.id) {
                elem[0].focus();
            }
        });
    };
}]);