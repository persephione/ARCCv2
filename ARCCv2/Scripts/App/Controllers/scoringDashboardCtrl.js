angular.module('App').controller('scoringDashboardCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'scores', 'parameters', 'shared',
    function ($scope, $filter, $location, ngTableParams, scores, parameters, shared) {
        $scope.model = {
            selected: 1,
            status: 'Ready to Score',
            readyToScoreList: [],
            allActiveList: [],
            allArchivedList: []
        };
        var data = [];

        // get data and populate list
        shared.GetProposals.Get().then(function (result) {

            // set the lists for the View
            angular.forEach(result, function (proposal) {
                // if the user hasn't score an active proposal yet, then add proposal to this list
                if(proposal.Status === 'Active') // TODO: haven't added CAS yet. add this filter after ----------------//
                    $scope.model.readyToScoreList.push(proposal);

                // then separate by active and archived
                if (proposal.Status === 'Active')
                    $scope.model.allActiveList.push(proposal);
                else
                    $scope.model.allArchivedList.push(proposal);

                // initial list will display Ready to Score
                data = $scope.model.readyToScoreList;
            });


            setTableParams();
        });

        // set settings for ng-table
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

        // view selected proposal
        $scope.viewDetail = function (proposal) {
            parameters.add("proposalId", proposal.ProposalID);

            if (proposal.Type == 'ARCC') {
                $location.path('/Scores/ARCCProposalToScore');
            } else {
                $location.path('/Scores/DeeProposalToScore');
            }
        };

        // set the current list selection
        $scope.setSelection = function (selectionId, selectionLabel) {
            $scope.model.status = selectionLabel;
            $scope.model.selected = selectionId;

            if ($scope.model.selected === 1)
                data = $scope.model.readyToScoreList;
            else if ($scope.model.selected === 2)
                data = $scope.model.allActiveList;
            else
                data = $scope.model.allArchivedList;

            $scope.tableParams.reload();
        };

    }]);
