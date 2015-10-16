angular.module('App').controller('deeProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'deeProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, deeProposal) {
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
