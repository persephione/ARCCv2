angular.module('App').controller('deeProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$timeout', 'scores',
    function ($scope, $filter, $location, ngTableParams, parameters, $timeout, scores) {
        $scope.model = {
            proposal: {}
        };

        // get proposal
        $scope.model.proposal.Id = parameters.get("proposalId");



        // sets the params for ng-table
        $scope.setTableParams = function () {

        };

    }]);
