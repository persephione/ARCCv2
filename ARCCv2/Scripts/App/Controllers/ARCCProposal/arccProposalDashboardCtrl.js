angular.module('App').controller('arccProposalDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, ngTableParams, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            searchString: '',
            TreasurerRole: null,
            selected: 1,
            showingSearchResults: false,
            deposits: [],
            selectedStatus: 'Unforwarded',
            statusId: 0,
            AssociatedText: '',
            titleHeight: '',
            setToStatuses: [
                { statusID: 0, order: 0, show: false, click: function () { $scope.updateStatus(0); }, description: 'Unforwarded' },
                { statusID: 1, order: 1, show: true, click: function () { $scope.updateStatus(1); }, description: 'Forwarded' },
                { statusID: 2, order: 2, show: true, click: function () { $scope.updateStatus(2); }, description: 'Posted Not Banked' },
                { statusID: 3, order: 3, show: true, click: function () { $scope.updateStatus(3); }, description: 'Batched For Banking' },
                { statusID: 4, order: 4, show: true, click: function () { $scope.updateStatus(4); }, description: 'Bank Batched' },
                { statusID: 999, order: 5, show: true, divider: true },
                { statusID: 9, order: 6, show: true, click: function () { $scope.updateStatus(9); }, description: 'Voided' }
            ]
        };
        var data = [];

        

        // get data and populate list. default initial view is Unforwarded
        arccProposal.GetARCCProposals.Get().then(function (result) {
            data = result;
            angular.forEach(result, function (deposit) {
                //if (deposit.Status === 'UNFORWARDED                   ') // this is how the status description is written in the db???
                //    data.push(deposit);
            });

            $scope.setTableParams();
            $scope.setToStatusVisibility(0);
        });

        // sets the params for ng-table
        $scope.setTableParams = function () {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,           // count per page
                sorting: {
                    DepositID: 'asc'
                },
                filter: {
                    DepositID: '',
                    Amount: '',
                    OverShort: '',
                    CreatedDate: '',
                    CreatedBy: '',
                    Status: ''
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use built-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        };

        // when user clicks on a status in the button bar, query db for all records with that status and update StatusTo dropdown
        $scope.setViewStatus = function (selectedID) {
            $scope.model.statusId = selectedID;

            $scope.model.searchCriteria.status = selectedID;
            var searchCriteria = searchedByCriteria.create($scope.model.searchCriteria, $scope.model.searchedByLabels);
            deposits.GetDeposits.Update(searchCriteria.searchCriteriaList).then(function (result) {
                data = result;
                $scope.tableParams.reload();
                $scope.setToStatusVisibility(selectedID);
            });
        };

        // function used to sort the statuses array after we set the proper order for the current filter
        function sortSetToStatuses() {
            $scope.model.setToStatuses.sort(function (a, b) { return a.order - b.order; });
        };

        // select the status from the array
        function getSetToStatus(statusDescription) {
            return $scope.model.setToStatuses.filter(function (x) {
                return (x.description == statusDescription || (x.divider && statusDescription === 'divider'));
            })[0];
        };

        // set the visibility of statuses in dropdown selection
        $scope.setToStatusVisibility = function (selectedID) {
            angular.forEach($scope.model.setToStatuses, function (status) {
                if (status.statusID <= selectedID) {
                    getSetToStatus(status.description).show = false;
                } else {
                    getSetToStatus(status.description).show = true;
                }
            });
            sortSetToStatuses();
        };

        // updates the selected records with new status
        $scope.updateStatus = function () {
            // TODO: wireframe says to open a popup before updating status
        };

        $scope.checkboxes = { 'checked': false, items: {} };

        // watch for check all checkbox
        $scope.$watch('checkboxes.checked', function (value) {
            angular.forEach($scope.users, function (item) {
                if (angular.isDefined(item.id)) {
                    $scope.checkboxes.items[item.id] = value;
                }
            });
        });

        // watch for data checkboxes
        $scope.$watch('checkboxes.items', function (values) {
            if (!$scope.users) {
                return;
            }
            var checked = 0, unchecked = 0,
                    total = $scope.users.length;
            angular.forEach($scope.users, function (item) {
                checked += ($scope.checkboxes.items[item.id]) || 0;
                unchecked += (!$scope.checkboxes.items[item.id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            // grayed checkbox
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);

        // search for deposit records
        $scope.search = function () {
            $modal.open({
                templateUrl: 'Banking/ModalDepositSearch',
                controller: 'modalDepositSearchCtrl',
                keyboard: false,
                backdrop: 'static'
            }).result.then(function (returnValue) {
                if (returnValue != null) {
                    //set the date to a filtered value for using with table column filter
                    angular.forEach(returnValue.data, function (deposit) {
                        deposit.CreatedDateViewValue = $filter('date')(deposit.CreatedDateViewValue, 'MM/dd/yyyy h:mma');
                    });
                    data = returnValue.data;
                    $scope.model.searchString = returnValue.searchedBy;
                    $scope.model.searchResultCount = data.length;
                }
                $scope.tableParams.reload();
            });
        };

        // view selected deposit record
        $scope.viewDeposit = function (deposit) {
            parameters.add("depositId", deposit.DepositID);
            $location.path('/Banking/DepositItem');
        };

        // CreatedDate column datepicker filter functionality
        $scope.datePicker = {
            isOpen: false
        };
        $scope.openFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $timeout(function () {
                $scope.datePicker.isOpen = true;
            }, 50);
        };
        $scope.dateOptions = {
            formatYear: 'yyyy',
            formatMonth: 'MM',
            formatDay: 'dd',
            startingDay: 1
        };

    }]);
