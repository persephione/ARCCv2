angular.module('App').directive('dcCheckList', function () {
    var checkedIcon = 'checklist-item-selected';
    var uncheckedIcon = 'checklist-item-unselected';
    return {
        restrict: 'A',
        scope: {
            originalChecked: '=dcCheckList',
            readonly: '=dcCheckListReadonly',
            dcCheckListChanged: '&'
        },
        link: function postLink(scope, element, attrs) {

            var check = angular.element(element);

            if (scope.readonly == true) {
                check.unbind("click");
            } else {
                check.bind("click", toggle);
            }

            // Make a copy of the original value
            scope.checked = angular.copy(scope.originalChecked);

            function toggle() {
                scope.checked = !scope.checked;
                setClass();
                scope.dcCheckListChanged({ dcCheckList: scope.checked });
            }

            function setClass() {
                check.removeClass(scope.checked ? uncheckedIcon : checkedIcon);
                check.addClass(scope.checked ? checkedIcon : uncheckedIcon);
            }

            setClass();
        }
    };
});