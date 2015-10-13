angular.module('App').controller('arccProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$modal', '$timeout',
    function ($scope, $filter, $location, ngTableParams, parameters, $modal, $timeout) {
        $scope.model = {

        };
        var data = [];

        // get data and populate list. default initial view is Unforwarded
        banking.GetDeposits.Get().then(function (result) {
            data = result;
            $scope.setTableParams();
        });

        // sets the params for ng-table
        $scope.setTableParams = function () {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,           // count per page
                sorting: {
                    //DepositID: 'asc'
                },
                filter: {
                    //DepositID: '',
                    //Amount: ''
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

        // view selected deposit record
        $scope.viewDeposit = function (deposit) {
            parameters.add("depositId", deposit.DepositID);
            $location.path('/Banking/DepositItem');
        };

    }]);
