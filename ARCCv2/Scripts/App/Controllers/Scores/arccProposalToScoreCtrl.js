﻿angular.module('App').controller('arccProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$timeout', 'scores',
    function ($scope, $filter, $location, parameters, $timeout, scores) {
        $scope.model = {
            proposal: {},
            viewOnly: true
        };
        $scope.slideClass = 'slide-left';
        
        // get proposal
        $scope.model.proposal.Id = parameters.get("proposalId");

        // query db for proposal
        scores.GetProposals.Get($scope.model.proposal.Id).then(function (result) {
            $scope.model.proposal = result;
        });

        $scope.toggleScorePanel = function () {
            $scope.isPartialActive = !$scope.isPartialActive;

            // css transitions
            if ($scope.isPartialActive === true) {
                $scope.slideClass = 'slide-right';
            }
            else {
                $scope.slideClass = 'slide-left';
            }
        };

    }]);
