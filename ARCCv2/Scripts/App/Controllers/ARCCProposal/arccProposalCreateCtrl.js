angular.module('App').controller('arccProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'arccProposal',
    function ($scope, $filter, $location, arccProposal) {
        $scope.model = {
            proposal: {},
            hardwareQuickEntry: { hardware: '', arcc: '', department: '', college: '', other: '' },
            softwareQuickEntry: { software: '', arcc: '', department: '', college: '', other: '' },
            otherQuickEntry: { other: '', arcc: '', department: '', college: '', other: '' },
            hardwareList: [],
            softwareList: [],
            otherList: [],
            warningText: ''
        };

        $scope.addHardwareQuickEntry = function () {
            if (isNotEmpty($scope.model.hardwareQuickEntry)) {
                $scope.model.hardwareList.push(angular.copy($scope.model.hardwareQuickEntry));
                $scope.model.hardwareQuickEntry = { hardware: '', arcc: '', department: '', college: '', other: '' };
            }
        };

        $scope.addSoftwareQuickEntry = function () {
            if (isNotEmpty($scope.model.softwareQuickEntry)) {
                $scope.model.softwareList.push(angular.copy($scope.model.softwareQuickEntry));
                $scope.model.softwareQuickEntry = { software: '', arcc: '', department: '', college: '', other: '' };
            }
        };

        $scope.addOtherQuickEntry = function () {
            if (isNotEmpty($scope.model.otherQuickEntry)) {
                $scope.model.otherList.push(angular.copy($scope.model.otherQuickEntry));
                $scope.model.otherQuickEntry = { other: '', arcc: '', department: '', college: '', other: '' };
            }
        };

        $scope.save = function () {
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.proposal).then(function (result) {
                if (result === 1) { }
                // then save was a success, else there was an error and it wasn't saved to db
            });
        };

        isNotEmpty = function (quickEntryItem) {
            var notEmpty = false;
            for (var key in quickEntryItem) {
                if (quickEntryItem.hasOwnProperty(key)) {
                    notEmpty = notEmpty || (!angular.equals(quickEntryItem[key], ''));
                }
                if (notEmpty)
                    break;
            }
            return notEmpty;
        };
    }]);