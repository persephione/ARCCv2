angular.module('App').controller('arccProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'arccProposal',
    function ($scope, $filter, $location, arccProposal) {
        $scope.model = {
            proposal: {},
            hardwareQuickEntry: { hardwareName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 },
            softwareQuickEntry: { softwareName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 },
            otherQuickEntry: { otherName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 },
            hardwareList: [],
            hwArccTotal: 0.0,
            hwDepartmentTotal: 0.0,
            hwCollegeTotal: 0.0,
            hwOtherTotal: 0.0,
            softwareList: [],
            swArccTotal: 0.0,
            swDepartmentTotal: 0.0,
            swCollegeTotal: 0.0,
            swOtherTotal: 0.0,
            otherList: [],
            oArccTotal: 0.0,
            oDepartmentTotal: 0.0,
            oCollegeTotal: 0.0,
            oOtherTotal: 0.0,
            arccTotal : 0.0,
            departmentTotal: 0.0,
            collegeTotal : 0.0,
            otherTotal : 0.0,
            grandTotal : 0.0,
            warningText: ''
        };

        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.hardwareList.push(angular.copy($scope.model.hardwareQuickEntry));
                updateHardwareTotals();
                $scope.model.hardwareQuickEntry = { hardwareName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 };
            }
        };

        $scope.removeHardwareItem = function (item) {
            for (var index = 0; index < $scope.model.hardwareList.length; index++) {
                if (angular.equals(item, $scope.model.hardwareList[index])) {
                    $scope.model.hardwareList.splice(index, 1);
                    break;
                }
            }
            updateHardwareTotals();
        };

        $scope.addSoftwareQuickEntry = function () {
            if (isNotEmpty($scope.model.softwareQuickEntry)) {
                $scope.model.softwareList.push(angular.copy($scope.model.softwareQuickEntry));
                updateSoftwareTotals();
                $scope.model.softwareQuickEntry = { softwareName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 };
            }
        };

        $scope.removeSoftwareItem = function (item) {
            for (var index = 0; index < $scope.model.softwareList.length; index++) {
                if (angular.equals(item, $scope.model.softwareList[index])) {
                    $scope.model.softwareList.splice(index, 1);
                    break;
                }
            }
            updateSoftwareTotals();
        };

        $scope.addOtherQuickEntry = function () {
            if (isNotEmpty($scope.model.otherQuickEntry)) {
                $scope.model.otherList.push(angular.copy($scope.model.otherQuickEntry));
                updateOtherTotals();
                $scope.model.otherQuickEntry = { otherName: '', arcc: 0.0, department: 0.0, college: 0.0, other: 0.0 };
            }
        };

        $scope.removeOtherItem = function (item) {
            for (var index = 0; index < $scope.model.otherList.length; index++) {
                if (angular.equals(item, $scope.model.otherList[index])) {
                    $scope.model.otherList.splice(index, 1);
                    break;
                }
            }
            updateOtherTotals();
        };

        $scope.save = function () {
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.fullProposal).then(function (result) {
                if (result === 1) { }
                // then save was a success, else there was an error and it wasn't saved to db
            });
        };

        isNotEmpty = function (quickEntryItem) {
            var notEmpty = false;
            var keys = ['hardwareName', 'softwareName', 'otherName'];
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
            angular.forEach($scope.model.hardwareList, function (item) {
                $scope.model.hwArccTotal += item.arcc;
                $scope.model.hwDepartmentTotal += item.department;
                $scope.model.hwCollegeTotal += item.college;
                $scope.model.hwOtherTotal += item.other;
            });
            updateTotals();
        };

        updateSoftwareTotals = function () {
            $scope.model.swArccTotal = 0.0;
            $scope.model.swDepartmentTotal = 0.0;
            $scope.model.swCollegeTotal = 0.0;
            $scope.model.swOtherTotal = 0.0;
            angular.forEach($scope.model.softwareList, function (item) {
                $scope.model.swArccTotal += item.arcc;
                $scope.model.swDepartmentTotal += item.department;
                $scope.model.swCollegeTotal += item.college;
                $scope.model.swOtherTotal += item.other;
            });
            updateTotals();
        };

        updateOtherTotals = function () {
            $scope.model.oArccTotal = 0.0;
            $scope.model.oDepartmentTotal = 0.0;
            $scope.model.oCollegeTotal = 0.0;
            $scope.model.oOtherTotal = 0.0;
            angular.forEach($scope.model.otherList, function (item) {
                $scope.model.oArccTotal += item.arcc;
                $scope.model.oDepartmentTotal += item.department;
                $scope.model.oCollegeTotal += item.college;
                $scope.model.oOtherTotal += item.other;
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
    }]);