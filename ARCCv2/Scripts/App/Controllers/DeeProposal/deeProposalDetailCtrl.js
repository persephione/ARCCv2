angular.module('App').controller('deeProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'deeProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, deeProposal) {
        $scope.model = {
            fullProposal: {}
        };
        $scope.ARCCPartiallyFunded = '';
        $scope.warningMessage = '';
        $scope.successMessage = '';
        $scope.viewOnly = false;

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        deeProposal.GetDeeProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set to view only if proposal has been submitted
            $scope.viewOnly = $scope.model.fullProposal.DeeProposal.DeeSubmitted === true ? true : false;

            // set text on View
            $scope.ARCCPartiallyFunded = $scope.model.fullProposal.DeeProposal.ARCCPartiallyFunded === true ? 'Yes' : 'No';
        });



        // user can either save or submit proposal
        $scope.save = function (submit) {

            var savedText = submit == false ? 'saved.' : 'submitted.';

            // if user clicked on Save and Submit, then add the submitted date to proposal record
            if (submit == true) {
                $scope.model.fullProposal.DeeProposal.DeeSubmitted = true;
                $scope.model.fullProposal.DeeProposal.DeeSubmittedDate = new Date();
            }

            // update edited proposal to db
            deeProposal.SaveOrUpdateDeeProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result == 0)
                    $scope.warningMessage = 'Alert: Proposal was not saved! ' + savedText;
                else
                    $scope.successMessage = 'Success! Proposal was successfully ' + savedText;
            });
        };
    }]);
