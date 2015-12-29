angular.module('App').controller('arccProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'arccProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, arccProposal) {
        $scope.model = {
            fullProposal: {},
            hardwareQuickEntry: { ARCCHardwareName: '', ARCCHardwareARCCBudget: 0.0, ARCCHardwareDeptBudget: 0.0, ARCCHardwareCollegeBudget: 0.0, ARCCHardwareOtherBudget: 0.0 },
            softwareQuickEntry: { ARCCSoftwareName: '', ARCCSoftwareARCCBudget: 0.0, ARCCSoftwareDeptBudget: 0.0, ARCCSoftwareCollegeBudget: 0.0, ARCCSoftwareOtherBudget: 0.0 },
            otherQuickEntry: { ARCCOtherName: '', ARCCOtherARCCBudget: 0.0, ARCCOtherDeptBudget: 0.0, ARCCOtherCollegeBudget: 0.0, ARCCBudgetOther: 0.0 },
            hwArccTotal: 0.0,
            hwDepartmentTotal: 0.0,
            hwCollegeTotal: 0.0,
            hwOtherTotal: 0.0,
            swArccTotal: 0.0,
            swDepartmentTotal: 0.0,
            swCollegeTotal: 0.0,
            swOtherTotal: 0.0,
            oArccTotal: 0.0,
            oDepartmentTotal: 0.0,
            oCollegeTotal: 0.0,
            oOtherTotal: 0.0,
            arccTotal: 0.0,
            departmentTotal: 0.0,
            collegeTotal: 0.0,
            otherTotal: 0.0,
            grandTotal: 0.0,
            errorMessage: ''
        };
        $scope.viewOnly = false;
        $scope.ARCCPartiallyFunded = "No";
        $scope.ARCCReplacementEquipment = "No";

        $scope.statusType = [
            { Id: 1, StatusDescription: 'Pending Submission' },
            { Id: 2, StatusDescription: 'Submitted - Pending Approval' },
            { Id: 3, StatusDescription: 'Approved' },
            { Id: 4, StatusDescription: 'Not Approved' }
        ];

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        arccProposal.GetARCCProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set yes/no for bit values
            if ($scope.model.fullProposal.ARCCProposal.ARCCPartiallyFunded)
                $scope.ARCCPartiallyFunded = "Yes";
            if ($scope.model.fullProposal.ARCCProposal.ARCCReplacementEquipment)
                $scope.ARCCReplacementEquipment = "Yes";

            // set to view only if proposal has been submitted
            $scope.viewOnly = $scope.model.fullProposal.ARCCProposal.Status > 1 ? true : false;

            // compute budget totals
            updateHardwareTotals();
            updateSoftwareTotals();
            updateOtherTotals();
        });

        // add hardware record
        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.fullProposal.HardwareBudgetList.push(angular.copy($scope.model.hardwareQuickEntry));
                updateHardwareTotals();
                $scope.model.hardwareQuickEntry = { ARCCHardwareName: '', ARCCHardwareARCCBudget: 0.0, ARCCHardwareDeptBudget: 0.0, ARCCHardwareCollegeBudget: 0.0, ARCCHardwareOtherBudget: 0.0 };
            }
        };

        // remove hardware record
        $scope.removeHardwareItem = function (item) {
            for (var index = 0; index < $scope.model.fullProposal.HardwareBudgetList.length; index++) {
                if (angular.equals(item, $scope.model.fullProposal.HardwareBudgetList[index])) {
                    $scope.model.fullProposal.HardwareBudgetList.splice(index, 1);
                    break;
                }
            }
            updateHardwareTotals();
        };

        // add software record
        $scope.addSoftwareQuickEntry = function () {
            if (isNotEmpty($scope.model.softwareQuickEntry)) {
                $scope.model.fullProposal.SoftwareBudgetList.push(angular.copy($scope.model.softwareQuickEntry));
                updateSoftwareTotals();
                $scope.model.softwareQuickEntry = { ARCCSoftwareName: '', ARCCSoftwareARCCBudget: 0.0, ARCCSoftwareDeptBudget: 0.0, ARCCSoftwareCollegeBudget: 0.0, ARCCSoftwareOtherBudget: 0.0 };
            }
        };

        // remove software record
        $scope.removeSoftwareItem = function (item) {
            for (var index = 0; index < $scope.model.fullProposal.SoftwareBudgetList.length; index++) {
                if (angular.equals(item, $scope.model.fullProposal.SoftwareBudgetList[index])) {
                    $scope.model.fullProposal.SoftwareBudgetList.splice(index, 1);
                    break;
                }
            }
            updateSoftwareTotals();
        };

        // add other record
        $scope.addOtherQuickEntry = function () {
            if (isNotEmpty($scope.model.otherQuickEntry)) {
                $scope.model.fullProposal.OtherBudgetList.push(angular.copy($scope.model.otherQuickEntry));
                updateOtherTotals();
                $scope.model.otherQuickEntry = { ARCCOtherName: '', ARCCOtherARCCBudget: 0.0, ARCCOtherDeptBudget: 0.0, ARCCOtherCollegeBudget: 0.0, ARCCBudgetOther: 0.0 };
            }
        };

        // remove other record
        $scope.removeOtherItem = function (item) {
            for (var index = 0; index < $scope.model.fullProposal.OtherBudgetList.length; index++) {
                if (angular.equals(item, $scope.model.fullProposal.OtherBudgetList[index])) {
                    $scope.model.fullProposal.OtherBudgetList.splice(index, 1);
                    break;
                }
            }
            updateOtherTotals();
        };

        isNotEmpty = function (quickEntryItem) {
            var notEmpty = false;
            var keys = ['ARCCHardwareName', 'ARCCSoftwareName', 'ARCCOtherName'];
            angular.forEach(keys, function (key) {
                if (quickEntryItem.hasOwnProperty(key)) {
                    notEmpty = notEmpty || (!angular.equals(quickEntryItem[key], ""));
                }
            });
            return notEmpty;
        };

        updateHardwareTotals = function () {
            $scope.model.hwArccTotal = 0.0;
            $scope.model.hwDepartmentTotal = 0.0;
            $scope.model.hwCollegeTotal = 0.0;
            $scope.model.hwOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.HardwareBudgetList, function (item) {
                $scope.model.hwArccTotal += item.ARCCHardwareARCCBudget;
                $scope.model.hwDepartmentTotal += item.ARCCHardwareDeptBudget;
                $scope.model.hwCollegeTotal += item.ARCCHardwareCollegeBudget;
                $scope.model.hwOtherTotal += item.ARCCHardwareOtherBudget;
            });
            updateTotals();
        };

        updateSoftwareTotals = function () {
            $scope.model.swArccTotal = 0.0;
            $scope.model.swDepartmentTotal = 0.0;
            $scope.model.swCollegeTotal = 0.0;
            $scope.model.swOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.SoftwareBudgetList, function (item) {
                $scope.model.swArccTotal += item.ARCCSoftwareARCCBudget;
                $scope.model.swDepartmentTotal += item.ARCCSoftwareDeptBudget;
                $scope.model.swCollegeTotal += item.ARCCSoftwareCollegeBudget;
                $scope.model.swOtherTotal += item.ARCCSoftwareOtherBudget;
            });
            updateTotals();
        };

        updateOtherTotals = function () {
            $scope.model.oArccTotal = 0.0;
            $scope.model.oDepartmentTotal = 0.0;
            $scope.model.oCollegeTotal = 0.0;
            $scope.model.oOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.OtherBudgetList, function (item) {
                $scope.model.oArccTotal += item.ARCCOtherARCCBudget;
                $scope.model.oDepartmentTotal += item.ARCCOtherDeptBudget;
                $scope.model.oCollegeTotal += item.ARCCOtherCollegeBudget;
                $scope.model.oOtherTotal += item.ARCCBudgetOther;
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

        $scope.cancel = function () {
            $location.path('/Home/UserDashboard');
        };

        // user can either save or submit proposal
        $scope.save = function (submit) {

            var savedText = submit == false ? 'saved.' : 'submitted.';
            $scope.model.fullProposal.ARCCProposal.Status = $scope.statusType[0].Id; // set Status to Pending Submission
            $scope.model.fullProposal.ARCCProposal.ARCCReplacementARCCYear = parseInt($scope.model.fullProposal.ARCCProposal.ARCCReplacementARCCYear);

            // if user clicked on Save and Submit, then add the submitted date to proposal record
            if (submit === true) {
                $scope.model.fullProposal.ARCCProposal.Status = $scope.statusType[1].Id; // set Status to Submitted - Pending Approval
                $scope.model.fullProposal.ARCCProposal.ARCCSubmittedDate = new Date();
            }

            // update edited proposal to db
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result == 0)
                    $scope.model.errorMessage = 'Alert: Proposal was not saved! ' + savedText;
                else {
                    $location.path('/Home/UserDashboard');
                }
            });
        };

    }]);
