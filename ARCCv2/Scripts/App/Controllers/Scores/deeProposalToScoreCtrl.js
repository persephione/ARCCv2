angular.module('App').controller('deeProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$timeout', 'scores', 'deeProposals',
    function ($scope, $filter, $location, ngTableParams, parameters, $timeout, scores, deeProposals) {
        $scope.model = {
            proposal: {}
        };

        // get proposal id from params
        $scope.model.proposal.Id = parameters.get("proposalId");

        // get proposal from db
        deeProposal.GetDeeProposals.Get().then(function (result) {
            $scope.model.proposal = result;
        });


    }]);
