angular.module('App').controller('userDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', 'arccProposal', 'shared',
    function ($scope, $filter, $location, ngTableParams, parameters, arccProposal, shared) {
        $scope.model = {
            selected: 1,
            batchStatus: 'ARCC Proposals'
        };
        var data = [];

        //Get data and populate list-------------------------------------------//
        shared.GetProposals.Get().then(function (result) {
            data = result;

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

        });

        $scope.createProposal = function (type) {
            if(type === 0)
                $location.path('/ARCCProposal/ARCCProposalCreate');
            else
                $location.path('/DeeProposal/DeeProposalCreate');
        };

        $scope.viewDetail = function (proposal) {
            parameters.add("proposalId", proposal.ProposalID);
            $location.path('/ARCCProposal/ARCCProposalDetail');
        };

        $scope.setSelection = function (selectionId, selectionLabel) {
            $scope.model.batchStatus = selectionLabel;
            $scope.model.selected = selectionId;
        };


    }]);
