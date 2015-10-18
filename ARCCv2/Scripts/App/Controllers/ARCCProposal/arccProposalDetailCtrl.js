angular.module('App').controller('arccProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            fullProposal: {}
        };
        $scope.viewOnly = false;

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        arccProposal.GetARCCProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set to view only if proposal has been submitted
            $scope.viewOnly = $scope.model.fullProposal.ARCCProposal.ARCCSubmitted == true ? true : false;
        });


    }]);
