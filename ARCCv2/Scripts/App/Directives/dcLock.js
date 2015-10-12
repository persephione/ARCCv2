angular.module('App').directive('dcLock', function () {
    var lockedIcon = 'lock-small-icon';
    var unlockedIcon = 'unlock-small-icon';
    return {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            locked: '=dcLock',
            readonly: '=dcLockReadonly',
            dcLockChanged: '&'
        },
        link: function postLink(scope, element, attrs) {

            var lock = angular.element(element);

            if (scope.readonly) {
                lock.unbind("click");
            } else {
                lock.bind("click", toggle);
            }

            function toggle() {
                scope.lock = !scope.lock;
                setLockIcon();
                scope.dcLockChanged({ dcLock: scope.lock });
            }

            function setLockIcon() {
                lock.removeClass(scope.lock ? lockedIcon : unlockedIcon);
                lock.addClass(scope.lock ? unlockedIcon : lockedIcon);
            }

            setLockIcon();
        }
    };
});