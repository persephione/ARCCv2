angular.module('App').controller('userDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', 'shared',
    function ($scope, $filter, $location, ngTableParams, parameters, shared) {
        var data = [];

        // get data and populate list
        shared.GetProposals.Get().then(function (result) {
            data = result;
            setTableParams();
        });

        $scope.goHome = function () {
            $location.path('/Home/Welcome');
        };

        // set the settings for ng-table
        var setTableParams = function () {
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
        };

        // create a new proposal
        $scope.createProposal = function (type) {
            if(type === 0)
                $location.path('/ARCCProposal/ARCCProposalCreate');
            else
                $location.path('/DeeProposal/DeeProposalCreate');
        };

        // send the user to view the proposal details
        $scope.viewDetail = function (proposal) {
            parameters.add("proposalId", proposal.ProposalID);

            if (proposal.Type === 'ARCC')
                $location.path('/ARCCProposal/ARCCProposalDetail');
            else
                $location.path('/DeeProposal/DeeProposalDetail');
        };

    }]);
