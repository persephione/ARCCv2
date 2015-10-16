angular.module('App').controller('arccProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            proposal: {}
        };

        // get proposal id from params
        $scope.model.proposal.Id = parameters.get("proposalId");

        // get proposal from db
        arccProposal.GetARCCProposals.Get($scope.model.proposal.Id).then(function (result) {
            $scope.model.proposal = result;
        });


    }]);
