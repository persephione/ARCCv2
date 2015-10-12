angular.module('App').directive('dcCheck', function () {
    var checkedIcon; // = 'check-mini-icon';
    var uncheckedIcon; // = 'cross-out-mini-icon';
    return {
        restrict: 'A',
        scope: {
            originalChecked: '=dcCheck',
            readonly: '=dcCheckReadonly',
            dcCheckChanged: '&'
        },
        link: function postLink(scope, element, attrs) {

            var check = angular.element(element);

            if (scope.readonly) {
                check.unbind("click");
                checkedIcon = 'check-mini-icon';
                uncheckedIcon = 'cross-out-mini-icon';
            } else {
                check.bind("click", toggle);
                checkedIcon = 'check-icon-c';
                uncheckedIcon = 'cross-out-icon-c';
            }

            // Make a copy of the original value
            scope.checked = angular.copy(scope.originalChecked);

            function toggle() {
                scope.checked = !scope.checked;
                setClass();
                scope.dcCheckChanged({ dcCheck: scope.checked });
            }

            function setClass() {
                check.removeClass(scope.checked ? uncheckedIcon : checkedIcon);
                check.addClass(scope.checked ? checkedIcon : uncheckedIcon);
            }

            setClass();
        }
    };
});