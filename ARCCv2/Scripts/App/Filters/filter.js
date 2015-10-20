'use strict';

function pad(num, size) {
    var s = "0000000000000000" + num;
    return s.substr(s.length - size);
}

// Converts a camel or Pascal case name to a label:
// "upperCaseEachWordAndAddASpaceBetweenEachWord" = "Upper Case Each Word And Add A Space Between Each Word"
angular.module('App').filter('nameToLabel', function () {
    return function(input) {
        if (typeof input === 'string') {
            input[0] = input[0].toUpperCase();

            var returnValue = input.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1)
            return returnValue.join(' ');
        }
        return input;
    };
});

angular.module('App').filter('formatPercent', ['$filter', function ($filter) {
    return function (input) {
        return $filter('number')(parseFloat(input)) + '%';
    };
}]);

angular.module('App').filter('dcCurrency', ['numberFilter', function (numberFilter) {
    return function(input) {
        if (angular.isNumber(input)) {
            //input = Math.round(input);
            if (input < 0) {
                input = Math.abs(input);
                input = numberFilter(input, 2);
                input = '(' + input + ')';
            } else {
                input = numberFilter(input, 2);
            }
        }
        return input;
    };
}]);

angular.module('App').filter('dcDate', ['dateFilter', function (dateFilter) {
    return function(input) {
        return dateFilter(input, 'MM/dd/yyyy');
    };
}]);

angular.module('App').filter('dcAccount', function () {
    return function(input) {
        if (angular.isNumber(input)) {
            input = input.toString();
        }
        input = pad(input, 9);
        input = input.substr(0, 2) + "-" + input.substr(2, 4) + "-" + input.substr(6, 3);
        return input;
    };
});

angular.module('App').filter('dcNewIfEmpty', function () {
    return function(input) {
        if (angular.isUndefined(input) || input == null || input.length < 1) {
            return 'New';
        }
        return input;
    };
});

angular.module('App').filter('dcCurrency2Decimal', ['numberFilter', function (numberFilter) {
    return function (input) {
        if (angular.isNumber(input)) {
            if (input < 0) {
                input = Math.abs(input);
                input = numberFilter(input, 2);
                input = '(' + input + ')';
            } else {
                input = numberFilter(input, 2);
            }
        }
        return input;
    };
}]);

angular.module('App').filter('dcNewOrNumber', function () {
    return function(input) {
        if (angular.isUndefined(input) || input == null) {
            return "New";
        }
        if (angular.isNumber(input)) {
            input = input.toString();
        }
        if (input.length > 0) {
            return input;
        } else {
            return "New";
        }
    };
});

angular.module('App').filter('dcPhoneNumber', function () {
    return function(input) {
        if (angular.isUndefined(input)) {
            return "";
        }
        if (angular.isNumber(input)) {
            input = input.toString();
        }
        input = pad(input, 10);
        input = "(" + input.substr(0, 3) + ") " + input.substr(3, 3) + "-" + input.substr(6, 4);
        return input;
    };


});
