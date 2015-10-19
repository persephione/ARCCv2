angular.module('App').controller('deeProposalDetailCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$modal', '$timeout', 'deeProposal',
    function ($scope, $filter, $location, parameters, $modal, $timeout, deeProposal) {
        $scope.model = {
            fullProposal: {
                HardwareBudgetList: [],
                SoftwareBudgetList: [],
                OtherBudgetList: [],
            },
            hardwareQuickEntry: { DeeHardwareName: '', DeeHardwareDeeBudget: 0.0, DeeHardwareDeptBudget: 0.0, DeeHardwareCollegeBudget: 0.0, DeeHardwareOtherBudget: 0.0 },
            softwareQuickEntry: { DeeSoftwareName: '', DeeSoftwareDeeBudget: 0.0, DeeSoftwareDeptBudget: 0.0, DeeSoftwareCollegeBudget: 0.0, DeeSoftwareOtherBudget: 0.0 },
            otherQuickEntry: { DeeOtherName: '', DeeOtherDeeBudget: 0.0, DeeOtherDeptBudget: 0.0, DeeOtherCollegeBudget: 0.0, DeeOtherOtherBudget: 0.0 },
            hwDeeTotal: 0.0,
            hwDepartmentTotal: 0.0,
            hwCollegeTotal: 0.0,
            hwOtherTotal: 0.0,
            swDeeTotal: 0.0,
            swDepartmentTotal: 0.0,
            swCollegeTotal: 0.0,
            swOtherTotal: 0.0,
            oDeeTotal: 0.0,
            oDepartmentTotal: 0.0,
            oCollegeTotal: 0.0,
            oOtherTotal: 0.0,
            deeTotal : 0.0,
            departmentTotal: 0.0,
            collegeTotal : 0.0,
            otherTotal : 0.0,
            grandTotal : 0.0,
            errorMessage: ''
        };
        $scope.ARCCPartiallyFunded = 'No';
        $scope.viewOnly = false;

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // get proposal from db
        deeProposal.GetDeeProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set to view only if proposal has been submitted
            $scope.viewOnly = $scope.model.fullProposal.DeeProposal.DeeSubmitted === true ? true : false;

            // set text on View
            if ($scope.model.fullProposal.DeeProposal.ARCCPartiallyFunded)
                $scope.ARCCPartiallyFunded = 'Yes';

            // compute budget totals
            updateHardwareTotals();
            updateSoftwareTotals();
            updateOtherTotals();
        });

        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.fullProposal.HardwareBudgetList.push(angular.copy($scope.model.hardwareQuickEntry));
                updateHardwareTotals();
                $scope.model.hardwareQuickEntry = { DeeHardwareName: '', DeeHardwareDeeBudget: 0.0, DeeHardwareDeptBudget: 0.0, DeeHardwareCollegeBudget: 0.0, DeeHardwareOtherBudget: 0.0 };
            }
        };

        $scope.removeHardwareItem = function (item) {
            for (var index = 0; index < $scope.model.fullProposal.HardwareBudgetList.length; index++) {
                if (angular.equals(item, $scope.model.fullProposal.HardwareBudgetList[index])) {
                    $scope.model.fullProposal.HardwareBudgetList.splice(index, 1);
                    break;
                }
            }
            updateHardwareTotals();
        };

        $scope.addSoftwareQuickEntry = function () {
            if (isNotEmpty($scope.model.softwareQuickEntry)) {
                $scope.model.fullProposal.SoftwareBudgetList.push(angular.copy($scope.model.softwareQuickEntry));
                updateSoftwareTotals();
                $scope.model.softwareQuickEntry = { DeeSoftwareName: '', DeeSoftwareDeeBudget: 0.0, DeeSoftwareDeptBudget: 0.0, DeeSoftwareCollegeBudget: 0.0, DeeSoftwareOtherBudget: 0.0 };
            }
        };

        $scope.removeSoftwareItem = function (item) {
            for (var index = 0; index < $scope.model.fullProposal.SoftwareBudgetList.length; index++) {
                if (angular.equals(item, $scope.model.fullProposal.SoftwareBudgetList[index])) {
                    $scope.model.fullProposal.SoftwareBudgetList.splice(index, 1);
                    break;
                }
            }
            updateSoftwareTotals();
        };

        $scope.addOtherQuickEntry = function () {
            if (isNotEmpty($scope.model.otherQuickEntry)) {
                $scope.model.fullProposal.OtherBudgetList.push(angular.copy($scope.model.otherQuickEntry));
                updateOtherTotals();
                $scope.model.otherQuickEntry = { DeeOtherName: '', DeeOtherDeeBudget: 0.0, DeeOtherDeptBudget: 0.0, DeeOtherCollegeBudget: 0.0, DeeOtherOtherBudget: 0.0 };
            }
        };

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
            var keys = ['DeeHardwareName', 'DeeSoftwareName', 'DeeOtherName'];
            angular.forEach(keys, function(key) {
                if (quickEntryItem.hasOwnProperty(key)) {
                    notEmpty = notEmpty || (!angular.equals(quickEntryItem[key], ""));
                }
            });
            return notEmpty;
        };

        updateHardwareTotals = function () {
            $scope.model.hwDeeTotal = 0.0;
            $scope.model.hwDepartmentTotal = 0.0;
            $scope.model.hwCollegeTotal = 0.0;
            $scope.model.hwOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.HardwareBudgetList, function (item) {
                $scope.model.hwDeeTotal += item.DeeHardwareDeeBudget;
                $scope.model.hwDepartmentTotal += item.DeeHardwareDeptBudget;
                $scope.model.hwCollegeTotal += item.DeeHardwareCollegeBudget;
                $scope.model.hwOtherTotal += item.DeeHardwareOtherBudget;
            });
            updateTotals();
        };

        updateSoftwareTotals = function () {
            $scope.model.swDeeTotal = 0.0;
            $scope.model.swDepartmentTotal = 0.0;
            $scope.model.swCollegeTotal = 0.0;
            $scope.model.swOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.SoftwareBudgetList, function (item) {
                $scope.model.swDeeTotal += item.DeeSoftwareDeeBudget;
                $scope.model.swDepartmentTotal += item.DeeSoftwareDeptBudget;
                $scope.model.swCollegeTotal += item.DeeSoftwareCollegeBudget;
                $scope.model.swOtherTotal += item.DeeSoftwareOtherBudget;
            });
            updateTotals();
        };

        updateOtherTotals = function () {
            $scope.model.oDeeTotal = 0.0;
            $scope.model.oDepartmentTotal = 0.0;
            $scope.model.oCollegeTotal = 0.0;
            $scope.model.oOtherTotal = 0.0;
            angular.forEach($scope.model.fullProposal.OtherBudgetList, function (item) {
                $scope.model.oDeeTotal += item.DeeOtherDeeBudget;
                $scope.model.oDepartmentTotal += item.DeeOtherDeptBudget;
                $scope.model.oCollegeTotal += item.DeeOtherCollegeBudget;
                $scope.model.oOtherTotal += item.DeeOtherOtherBudget;
            });
            updateTotals();
        };

        updateTotals = function () {
            $scope.model.deeTotal = $scope.model.hwDeeTotal + $scope.model.swDeeTotal + $scope.model.oDeeTotal;
            $scope.model.departmentTotal = $scope.model.hwDepartmentTotal + $scope.model.swDepartmentTotal + $scope.model.oDepartmentTotal;
            $scope.model.collegeTotal = $scope.model.hwCollegeTotal + $scope.model.swCollegeTotal + $scope.model.oCollegeTotal;
            $scope.model.otherTotal = $scope.model.hwOtherTotal + $scope.model.swOtherTotal + $scope.model.oOtherTotal;
            $scope.model.grandTotal = $scope.model.deeTotal + $scope.model.departmentTotal + $scope.model.collegeTotal + $scope.model.otherTotal;
        };

        $scope.cancel = function () {
            $location.path('/Home/UserDashboard');
        };

        // user can either save or submit proposal
        $scope.save = function (submit) {

            // if user clicked on Save and Submit, then add the submitted date to proposal record
            if (submit == true) {
                $scope.model.fullProposal.DeeProposal.DeeSubmitted = true;
                $scope.model.fullProposal.DeeProposal.DeeSubmittedDate = new Date();
            }

            // update edited proposal to db
            deeProposal.SaveOrUpdateDeeProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result == 0)
                    $scope.model.errorMessage = 'Alert: Proposal was not saved!';
                else
                    $location.path('/Home/UserDashboard');
            });
        };


    }]);
