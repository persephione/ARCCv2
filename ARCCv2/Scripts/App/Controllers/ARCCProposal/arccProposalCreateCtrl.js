angular.module('App').controller('arccProposalCreateCtrl', [
    '$scope', '$filter', '$location', 'arccProposal',
    function ($scope, $filter, $location, arccProposal) {
        $scope.model = {
            proposal: {},
            warningText: ''
        };

        $scope.save = function () {
            arccProposal.SaveOrUpdateARCCProposal.Update($scope.model.proposal).then(function (result) {
                if (result === 1) { }
                    // then save was a success, else there was an error and it wasn't saved to db
            });
        };
    }]);
