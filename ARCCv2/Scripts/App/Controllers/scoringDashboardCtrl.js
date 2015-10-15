angular.module('App').controller('scoringDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams',
    function ($scope, $filter, $location, ngTableParams) {
        $scope.model = {
            selected: 1,
            batchStatus: 'Active ARCC Proposals'
        };
        var data = [];

        //Get data and populate list-------------------------------------------//
        //banking.GetBankBatches.Get().then(function (result) {
        //    data = result;

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                //ProposalID: 'asc'
            },
            filter: {
                //ProposalID: '',
                //ProposalName: ''
            }
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                // use build-in angular filter
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

        //        });



        $scope.viewBatch = function (batch) {
            // Preserve the current deposit list if it was a search - otherwise we will load
            // the current data on return.
            parameters.add("bankBatch", {
                action: 'showDetail',
                batch: batch,
                selectedStatus: $scope.model.selectedStatus,
                statusId: $scope.model.statusId,
                batches: $scope.model.batches,
                searchedBy: $scope.model.searchedBy
            });
            $location.path('/Banking/BankBatchItems');
        };

        $scope.setSelection = function (selectionId, selectionLabel) {
            $scope.model.batchStatus = selectionLabel;
            $scope.model.selected = selectionId;
        };
    }]);
