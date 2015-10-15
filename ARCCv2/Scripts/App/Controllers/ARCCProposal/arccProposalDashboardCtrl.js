angular.module('App').controller('arccProposalDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, ngTableParams, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            searchString: '',
            selected: 1,
            showingSearchResults: false,
            deposits: [],
            selectedStatus: 'Unforwarded',
            statusId: 0,
            AssociatedText: '',
            titleHeight: '',
            setToStatuses: [
                { statusID: 0, order: 0, show: false, click: function () { $scope.updateStatus(0); }, description: 'Unforwarded' },
                { statusID: 1, order: 1, show: true, click: function () { $scope.updateStatus(1); }, description: 'Forwarded' }
            ]
        };
        var data = [];

        

        // get data and populate list. default initial view is Unforwarded
        arccProposal.GetARCCProposals.Get().then(function (result) {
            data = result;


            $scope.setTableParams();
        });

        // sets the params for ng-table
        $scope.setTableParams = function () {
           
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
