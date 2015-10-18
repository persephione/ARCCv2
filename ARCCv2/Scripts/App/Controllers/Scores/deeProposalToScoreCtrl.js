angular.module('App').controller('deeProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'ngTableParams', 'parameters', '$timeout', 'scores', 'deeProposal', '$anchorScroll',
    function ($scope, $filter, $location, ngTableParams, parameters, $timeout, scores, deeProposal, $anchorScroll) {
        $scope.model = {
            fullProposal: {},
            DeeScore: {
                DeeScoreID : 0,
                DeeScoreResearch: 0,
                DeeScorePedagogy: 0,
                DeeScoreSoftware: 0,
                DeeScoreEvaluation: 0,
                DeeScoreSupport: 0,
                DeeScoreComment: '',
                DeeProposalID: 0
            },
            warningMessage: '',
            successMessage: ''
        };
        $scope.form = {};
        $scope.proposalIsArchived = false;
        $scope.isScoringActive = false;
        $scope.isApprovalActive = false;
        $scope.slideClass = 'slide-left';

        // get proposal id from params
        $scope.model.fullProposal.Id = parameters.get("proposalId");

        // query db for proposal
        deeProposal.GetDeeProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set the dee score proposal id to the current dee proposal
            $scope.model.DeeScore.DeeProposalID = $scope.model.fullProposal.DeeProposal.DeeProposalID;

            // if proposal has already been scored, remove action buttons
            if ($scope.model.fullProposal.DeeProposal.DeeApproval === true)
                $scope.proposalIsArchived = true;
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

        // assigns slider values to model
        $scope.assignSliderValues = function (num) {
            if (num === 1)
                $scope.model.DeeScore.DeeScoreResearch = parseInt(document.getElementById('currentval1').value);
            else if (num === 2)
                $scope.model.DeeScore.DeeScorePedagogy = parseInt(document.getElementById('currentval2').value);
            else if (num === 3)
                $scope.model.DeeScore.DeeScoreSoftware = parseInt(document.getElementById('currentval3').value);
            else if (num === 4)
                $scope.model.DeeScore.DeeScoreEvaluation = parseInt(document.getElementById('currentval4').value);
            else if (num === 5)
                $scope.model.DeeScore.DeeScoreSupport = parseInt(document.getElementById('currentval5').value);
        };

        // reset form and close panel
        $scope.cancel = function () {
            $scope.model.warningMessage = '';
            $scope.model.successMessage = '';

            // reset object
            $scope.model.DeeScore =
            {
                DeeScoreResearch: 0,
                DeeScorePedagogy: 0,
                DeeScoreSoftware: 0,
                DeeScoreEvaluation: 0,
                DeeScoreSupport: 0,
                DeeScoreTotal: 0,
                DeeScoreComment: ''
            };

            // move sliders back to 0
            $("#slider1").slider('value', 0);
            $("#slider2").slider('value', 0);
            $("#slider3").slider('value', 0);
            $("#slider4").slider('value', 0);
            $("#slider5").slider('value', 0);

            // reset values on View
            document.getElementById('currentval1').value = 0;
            document.getElementById('currentval2').value = 0;
            document.getElementById('currentval3').value = 0;
            document.getElementById('currentval4').value = 0;
            document.getElementById('currentval5').value = 0;

            $scope.form.NewDeeScoreForm.$setPristine(true);
            $scope.togglePanels('none');
        };

        // save ARCCScore model to db
        $scope.save = function () {
            // calculate total
            $scope.model.DeeScore.DeeScoreTotal = $scope.model.DeeScore.DeeScoreResearch +
                                                    $scope.model.DeeScore.DeeScorePedagogy +
                                                    $scope.model.DeeScore.DeeScoreSoftware +
                                                    $scope.model.DeeScore.DeeScoreEvaluation +
                                                    $scope.model.DeeScore.DeeScoreSupport;

            scores.SaveOrUpdateDeeScore.Update($scope.model.DeeScore).then(function (result) {
                // reset form
                $scope.cancel();

                // delay for animations
                angular.element(document).ready(function () {
                    $timeout(function () {
                        // display message
                        if (result === 0)
                            $scope.model.warningMessage = 'Alert: Score was not saved!';
                        else
                            $scope.model.successMessage = 'Score was successfully submitted!';
                    }, 400);
                });
            });
        };

    }]);
