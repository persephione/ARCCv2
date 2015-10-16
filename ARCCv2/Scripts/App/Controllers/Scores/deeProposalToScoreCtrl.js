angular.module('App').controller('deeProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$timeout', 'scores', 'deeProposal',
    function ($scope, $filter, $location, ngTableParams, parameters, $timeout, scores, deeProposal) {
        $scope.model = {
            proposal: {}
        };

        // get proposal id from params
        $scope.model.proposal.Id = parameters.get("proposalId");

        // get proposal from db
        deeProposal.GetDeeProposals.Get($scope.model.proposal.Id).then(function (result) {
            $scope.model.proposal = result;
        });


    }]);
