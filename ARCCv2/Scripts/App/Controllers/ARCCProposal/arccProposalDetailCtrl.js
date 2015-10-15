angular.module('App').controller('arccProposalDetailCtrl', [
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
       
        };

        // view selected deposit record
        $scope.viewDeposit = function (deposit) {
            parameters.add("depositId", deposit.DepositID);
            $location.path('/Banking/DepositItem');
        };

    }]);
