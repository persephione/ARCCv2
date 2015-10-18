angular.module('App').controller('arccProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            fullProposal: {}
        };
        $scope.warningMessage = '';
        $scope.successMessage = '';
        $scope.viewOnly = false;

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        arccProposal.GetARCCProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set to view only if proposal has been submitted
            $scope.viewOnly = $scope.model.fullProposal.ARCCProposal.ARCCSubmitted == true ? true : false;
        });

        // user can either save or submit proposal
        $scope.save = function (submit) {

            var savedText = submit == false ? 'saved.' : 'submitted.';

            // if user clicked on Save and Submit, then add the submitted date to proposal record
            if(submit == true)
            {
                $scope.model.fullProposal.ARCCProposal.ARCCSubmitted = true;
                $scope.model.fullProposal.ARCCProposal.ARCCSubmittedDate = new Date();
            } 

            // update edited proposal to db
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result == 0)
                    $scope.warningMessage = 'Alert: Proposal was not saved! ' + savedText;
                else
                    $scope.successMessage = 'Success! Proposal was successfully ' + savedText;
            });
        };

    }]);
