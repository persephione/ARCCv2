angular.module('dcDirectiveModule', []);

angular.module('dcDirectiveModule').factory('allOffsets', [function () {
    // Recurse the offsetParents to get the total offset
    var total = 0;
    return {
        get: function (element, offsetType, first) {
            if (first === undefined) {
                total = 0;
            }
            total += element[offsetType]; // References the current name of the offset to calculate. IE: offsetLeft, offsetTop
            if (element.offsetParent === null || element.offsetParent === undefined) {
                return total;
            } else {
                return this.get(element.offsetParent, offsetType, false);
            }
        }
    };
}]);

angular.module('dcDirectiveModule').directive('dcTypeahead', ['$timeout', 'allOffsets', function ($timeout, allOffsets) {
    function isIn(item, query) {
        if (item.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
        }
        return false;
    }

    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'source': '=',
            'initialValue': '=',
            'selected': '&',
            'width': '='
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.active = -1;
            $scope.results = [];
            $scope.query = "";
            $scope.dropdownName = "dc-ta-dropdown-" + $scope.$id;
            $scope.className = "dc-ta-li-class-" + $scope.$id;
            $scope.element = $element[0];

            $scope.$watch("initialValue", function (item) {
                if (angular.isObject(item)) {
                    $scope.query = item.Value;
                }
            });

            // specific function so we can unbind it when the popup closes
            var handlePopupEscape = function (event) {
                if (event.keyCode == 27) {
                    hideDropdown();
                }
            };

            var showDropdown = function () {
                $("#" + $scope.dropdownName).show();
                // a global keyup handler to catch escapes when the popup is showing
                $(document).keyup(handlePopupEscape);
            };

            var hideDropdown = function () {
                $("#" + $scope.dropdownName).hide();
                // remove the global popup escape handler when we close it!
                $(document).unbind("keyup", handlePopupEscape);
                $scope.element.firstChild.focus();
            };

            $scope.checkahead = function () {
                $scope.active = -1;
                var results = [];
                showFilteredList($scope.source, $scope.query);
                if ($scope.results.length > 0) {
                    showDropdown();
                } else {
                    hideDropdown();
                    // We need to clear out the selected item somewhere if nothing is selected
                    $scope.selected({ item: {} });
                }
            };

            $scope.setahead = function (item) {
                $scope.query = item.Value;
                hideDropdown();
                $scope.selected({ item: item });
                $timeout(function () {
                    $scope.$apply();
                });
            };

            // NOTE: This event will fire for every click on the form if the typeahead is the only input field.  No side effects observed
            //       from this so far.
            $scope.selectAll = function (evt) {
                var elem = angular.element(evt.srcElement)[0];
                if (elem != null) {
                    elem.selectionStart = 0;
                    elem.selectionEnd = elem.value.length;
                }
            };

            var setLocation = function () {
                var left = allOffsets.get($scope.element, 'offsetLeft');
                var top = allOffsets.get($scope.element, 'offsetTop') + 20;
                $("#" + $scope.dropdownName).css({ left: left + 'px', top: top + 'px' });
            };

            $(window).on('resize', function (event) {
                setLocation();
            });

            $element.bind('keyup', function (evt) {
                $scope.$apply(function () {
                    $scope.handleKeypress.call($scope, evt.which);
                });
            });

            $scope.handleKeypress = function (key) {
                if (key == 40 && $scope.active < $scope.results.length - 1) {
                    $scope.active += 1;
                    $("#" + $scope.dropdownName).children().children()[$scope.active].focus();
                }
                if (key == 38 && $scope.active > 0) {
                    $scope.active -= 1;
                }
                if (key == 38 && $scope.active < 0) {
                    $scope.active = $scope.results.length - 1;
                }
                if (key == 13 || key == 39) { // Enter key
                    if ($scope.active == -1) {  // Nothing currently selected
                        if ($scope.results.length == 1) { // Only one result showing
                            $scope.setahead($scope.results[0]); // set to first result
                        } else {
                            $scope.active += 1; // set the first item to selected - another enter will select this one
                        }
                    } else {
                        $scope.setahead($scope.results[$scope.active]);  // set the selected item
                    }
                }
                if (key == 27) {
                    hideDropdown();
                }
            };

            var showFilteredList = function (data, filterValue) {
                // Remove anything that may or may not be on the dom at this time
                $("#" + $scope.dropdownName).remove();
                $scope.results = [];

                // loop through newData adding a list item for each.
                // NOTE: at this time we're not able to get a response from these guys as they don't get compiled
                var templateList = [];
                angular.forEach(data, function (item, idx) {
                    if (filterValue.length === 0 || filterValue.length > 0 && item.Value.toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                        templateList.push(
                            '<li class="' + $scope.className + '" ng-class="{active: active==$index }">' +
                                '<a tabindex="-1" id="' + item.Id + '">' + item.Value + '</a>' +
                                '</li>');
                        $scope.results.push(item);
                    }
                });

                // Wrap the template list data with the unordered list tag to make it a complete template.
                var template =
                    '<ul class="dropdown-menu typeahead-dropdown" role="menu" id="' + $scope.dropdownName +
                        '" aria-labelledby="dropdownMenu" style="z-index:1070;">' +
                        templateList.join('') +
                        '</ul>';

                $(template).appendTo('body');
                setLocation();

                // watch for the clicks!  We're not in scope with this code.
                $("." + $scope.className + ' a').click(function (element) {
                    // We need to find the element from the list to make this work
                    angular.forEach($scope.source, function (item, idx) {
                        if (item.Id === Number(element.srcElement.id)) {
                            $scope.setahead(item);
                        }
                    });
                });

                // watch for the keys! We're not in scope with this code either.
                // we need to do different things than the typeahead, but similar
                $("." + $scope.className).keyup(function (event) {
                    if (event.keyCode == 40 && $scope.active < $scope.results.length - 1) {
                        $scope.active += 1;
                        $("#" + $scope.dropdownName).children().children()[$scope.active].focus();
                    }
                    if (event.keyCode == 38 && $scope.active > 0) {
                        $scope.active -= 1;
                        $("#" + $scope.dropdownName).children().children()[$scope.active].focus();
                    }
                    if (event.keyCode == 38 && $scope.active < 0) {
                        $scope.active = $scope.results.length - 1;
                    }
                    if (event.keyCode == 13 || event.keyCode == 39) { // Enter event.keyCode
                        if ($scope.active == -1) { // Nothing currently selected
                            if ($scope.results.length == 1) { // Only one result showing
                                $scope.setahead($scope.results[0]); // set to first result
                            } else {
                                $scope.active += 1; // set the first item to selected - another enter will select this one
                            }
                        } else {
                            $scope.setahead($scope.results[$scope.active]); // set the selected item
                        }
                    }
                });
            };

            $scope.$on('$destroy', function () {
                $("#" + $scope.dropdownName).remove();
                $("." + $scope.className).unbind();
                $('resize').unbind();
            });
        }],
        template: '<span class="dropdown" style="margin:0;">' +
                    '<input type="text" class="dropdown-toggle typeahead-caret-down {{class}}" ng-model="query" ng-change="checkahead()" ng-click="selectAll($event)" ng-focus="selectAll($event)" ng-style="{\'width\':width}"></span>',
        replace: true,
        link: function (scope, element, attrs) {
            scope.class = attrs.class;
        }
    };
}]);

angular.module('dcDirectiveModule').directive('dcDropdownToggle', ['$timeout', 'allOffsets', function ($timeout, allOffsets) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'title': '=',
            'dcDropdownToggle': '=',
            'selected': '&'
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.dropdownName = "dc-ta-dropdown-" + $scope.$id;
            $scope.className = "dc-ta-li-class-" + $scope.$id;
            $scope.element = $element[0];

            var templateList = [];
            angular.forEach($scope.dcDropdownToggle, function (item, idx) {
                templateList.push(
                    '<li class="' + $scope.className + '" ng-class="{active: active==$index }">' +
                        '<a tabindex="-1" id="' + item.Id + '">' + item.Value + '</a>' +
                        '</li>');
            });

            var template =
                '<ul class="dropdown-menu" id="' + $scope.dropdownName + '" style="z-index:1070;">' +
                    templateList.join('') +
                    '</ul>';

            $(template).appendTo('body');

            var setLocation = function () {
                var left = allOffsets.get($scope.element, 'offsetLeft');
                var top = allOffsets.get($scope.element, 'offsetTop') + $scope.element.offsetHeight;
                $("#" + $scope.dropdownName).css({ left: left + 'px', top: top + 'px' });
            };

            var isOpen = false;

            $scope.toggleDropdown = function () {
                setLocation();
                if (isOpen) {
                    $("#" + $scope.dropdownName).hide();
                } else {
                    $("#" + $scope.dropdownName).show();
                }
                isOpen = !isOpen;
            };

            $scope.closeDropdown = function () {
                $("#" + $scope.dropdownName).hide();
            };

            $("." + $scope.className).click(function (element) {
                $scope.closeDropdown();
                $scope.selected({ id: element.srcElement.id });
                isOpen = !isOpen;
            });

            $(window).on('resize', function (event) {
                setLocation();
            });

            $scope.$on('$destroy', function () {
                $("#" + $scope.dropdownName).remove();
                $("." + $scope.className).unbind();
                $('resize').unbind();
            });

        }],
        template:
            '<div class="dropdown">' +
                '<a class="dropdown-toggle" data-ng-click="toggleDropdown()" href="#" style="display:inline-block; font-size:12px; margin:5px 0; line-height:24px;">' +
                '{{title}}' + '<span class="caret" style="border-top-color:#0088cc;"></span>' +
                '</a>' +
                '</div>',
        replace: true
    };
}]);

angular.module('dcDirectiveModule').directive("dcHeaderValue", [function () {

    var newClass = 'text-gray no-bold';

    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'dcHeaderValue': '='
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.thisClass = newClass;
            $scope.thisValue = 'New';
            if (angular.isNumber($scope.dcHeaderValue) || angular.isString($scope.dcHeaderValue)) {
                $scope.thisValue = $scope.dcHeaderValue;
                $scope.thisClass = '';
            }
        }],
        template:
            '<span class="{{thisClass}}">{{thisValue}}</span>',
        replace: true
    };

}]);

angular.module('dcDirectiveModule').directive("dcCapitalize", [function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (input) {
                return input ? input.toUpperCase() : "";
            });
            $(element).css("text-transform", "uppercase");
        }
    };
}]);
