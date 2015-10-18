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

        // add hardware record
        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.fullProposal.HardwareBudgetList.push(angular.copy($scope.model.hardwareQuickEntry));
                updateHardwareTotals();
                $scope.model.hardwareQuickEntry = { hardwareName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 };
            }
        };

        updateHardwareTotals = function () {
            $scope.model.hwArccTotal = 0.0;
            $scope.model.hwDepartmentTotal = 0.0;
            $scope.model.hwCollegeTotal = 0.0;
            $scope.model.hwOtherTotal = 0.0;
            angular.forEach($scope.model.hardwareList, function (item) {
                $scope.model.hwArccTotal += item.arcc;
                $scope.model.hwDepartmentTotal += item.department;
                $scope.model.hwCollegeTotal += item.college;
                $scope.model.hwOtherTotal += item.other;
            });
            updateTotals();
        };

        updateTotals = function () {
            $scope.model.arccTotal = $scope.model.hwArccTotal + $scope.model.swArccTotal + $scope.model.oArccTotal;
            $scope.model.departmentTotal = $scope.model.hwDepartmentTotal + $scope.model.swDepartmentTotal + $scope.model.oDepartmentTotal;
            $scope.model.collegeTotal = $scope.model.hwCollegeTotal + $scope.model.swCollegeTotal + $scope.model.oCollegeTotal;
            $scope.model.otherTotal = $scope.model.hwOtherTotal + $scope.model.swOtherTotal + $scope.model.oOtherTotal;
            $scope.model.grandTotal = $scope.model.arccTotal + $scope.model.departmentTotal + $scope.model.collegeTotal + $scope.model.otherTotal;
        };


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
