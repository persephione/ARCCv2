angular.module('App').controller('arccProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$timeout', 'scores', 'arccProposal', '$anchorScroll',
    function ($scope, $filter, $location, parameters, $timeout, scores, arccProposal, $anchorScroll) {
        $scope.model = {
            proposal: {}
        };
        $scope.isScoringActive = false;
        $scope.isApprovalActive = false;
        $scope.slideClass = 'slide-left';
        $scope.model.score1 = 0;

        // get proposal
        $scope.model.proposal.Id = parameters.get("proposalId");

        // query db for proposal
        arccProposal.GetARCCProposals.Get($scope.model.proposal.Id).then(function (result) {
            $scope.model.proposal = result;
        });

        // toggle the scoring and approval panels
        $scope.togglePanels = function (status) {

            // scroll back up to the top of the page
            $anchorScroll();

            // change the status of the panels
            if (status === 'scoring') {
                $scope.slideClass = 'slide-left';

                // delay for animations
                angular.element(document).ready(function () {
                    $timeout(function () {
                        $scope.isScoringActive = true;
                    }, 400);
                });
            }
            else if (status === 'approval') {
                $scope.slideClass = 'slide-left';

                // delay for animations
                angular.element(document).ready(function () {
                    $timeout(function () {
                        $scope.isApprovalActive = true;
                    }, 400);
                });
            }
            else {
                $scope.slideClass = 'slide-right';

                // delay for animations
                angular.element(document).ready(function () {
                    $timeout(function () {
                        $scope.isScoringActive = false;
                        $scope.isApprovalActive = false;
                    }, 400);
                });
            }
        };

        // move the slider handles on value change
        $scope.move = function (num) {
            if (num === 1)
                $("#slider1").slider('value', $scope.model.score1);
            if (num === 2)
                $("#slider2").slider('value', $scope.model.Stock2Percent);
            if (num === 3)
                $("#slider3").slider('value', $scope.model.Stock3Percent);
        };

    }]);
