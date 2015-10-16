angular.module('App').controller('deeProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'deeProposal',
    function ($scope, $filter, $location, deeProposal) {
        $scope.model = {
            proposal: {},
            warningText: ''
        };

        $scope.save = function () {
            deeProposal.SaveOrUpdatDeeProposal.Update($scope.model.proposal).then(function (result) {
                if (result === 1) { }
                // then save was a success, else there was an error and it wasn't saved to db
            });
        };
    }]);
