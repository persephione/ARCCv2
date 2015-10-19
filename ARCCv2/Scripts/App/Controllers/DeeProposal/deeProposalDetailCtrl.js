angular.module('App').controller('deeProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'deeProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, deeProposal) {
        $scope.model = {
            fullProposal: {}
        };

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        deeProposal.GetDeeProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;
        });


    }]);
