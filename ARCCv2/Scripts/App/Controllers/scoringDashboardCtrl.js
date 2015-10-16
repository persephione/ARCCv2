angular.module('App').controller('scoringDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'scores', 'parameters',
    function ($scope, $filter, $location, ngTableParams, scores, parameters) {
        $scope.model = {
            selected: 1,
            batchStatus: 'Active ARCC Proposals'
        };
        var data = [];

        // get data and populate list
        scores.GetProposals.Get().then(function (result) {
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

        // view selected proposal
        $scope.viewDetail = function (proposal) {
            parameters.add("proposalId", proposal.ProposalID);

            if (proposal.Type == 'ARCC') {
                $location.path('/Scores/ARCCProposalToScore');
            } else {
                $location.path('/Scores/DeeProposalToScore');
            }
        };

        $scope.setSelection = function (selectionId, selectionLabel) {
            $scope.model.batchStatus = selectionLabel;
            $scope.model.selected = selectionId;
        };
    }]);
