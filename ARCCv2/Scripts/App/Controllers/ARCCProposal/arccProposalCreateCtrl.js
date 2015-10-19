angular.module('App').controller('arccProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'arccProposal',
    function ($scope, $filter, $location, arccProposal) {
        $scope.model = {
            fullProposal: {
                HardwareBudgetList: [],
                SoftwareBudgetList: [],
                OtherBudgetList: [],
            },
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
            arccTotal : 0.0,
            departmentTotal: 0.0,
            collegeTotal : 0.0,
            otherTotal : 0.0,
            grandTotal : 0.0,
            errorMessage: ''
        };

        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.fullProposal.HardwareBudgetList.push(angular.copy($scope.model.hardwareQuickEntry));
                updateHardwareTotals();
                $scope.model.hardwareQuickEntry = { ARCCHardwareName: '', ARCCHardwareARCCBudget: 0.0, ARCCHardwareDeptBudget: 0.0, ARCCHardwareCollegeBudget: 0.0, ARCCHardwareOtherBudget: 0.0 };
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
                $scope.model.softwareQuickEntry = { ARCCSoftwareName: '', ARCCSoftwareARCCBudget: 0.0, ARCCSoftwareDeptBudget: 0.0, ARCCSoftwareCollegeBudget: 0.0, ARCCSoftwareOtherBudget: 0.0 };
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
                $scope.model.otherQuickEntry = { ARCCOtherName: '', ARCCOtherARCCBudget: 0.0, ARCCOtherDeptBudget: 0.0, ARCCOtherCollegeBudget: 0.0, ARCCBudgetOther: 0.0 };
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
            var keys = ['ARCCHardwareName', 'ARCCSoftwareName', 'ARCCOtherName'];
            angular.forEach(keys, function(key) {
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
            $scope.model.fullProposal.ARCCProposal.ARCCReplacementARCCYear = parseInt($scope.model.fullProposal.ARCCProposal.ARCCReplacementARCCYear);
            // if user clicked on Save and Submit, then add the submitted date to proposal record
            if (submit == true) {
                $scope.model.fullProposal.ARCCProposal.ARCCSubmitted = true;
                $scope.model.fullProposal.ARCCProposal.ARCCSubmittedDate = new Date();
            }

            // update edited proposal to db
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result == 0)
                    $scope.model.errorMessage = 'Alert: Proposal was not saved! ' + savedText;
                else
                {
                    $location.path('/Home/UserDashboard');
                }
            });
        };
    }]);