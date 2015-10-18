angular.module('App').controller('arccProposalToScoreCtrl', [
    '$scope', '$filter', '$location', 'parameters', '$timeout', 'scores', 'arccProposal', '$anchorScroll',
    function ($scope, $filter, $location, parameters, $timeout, scores, arccProposal, $anchorScroll) {
        $scope.model = {
            fullProposal: {},
            ARCCScore: {
                ARCCScoreID: 0,
                ARCCScoreEducExp: 0,
                ARCCScoreInnovation: 0,
                ARCCScoreDissemination: 0,
                ARCCScoreEvaluation: 0,
                ARCCScoreSupport: 0,
                ARCCScoreTotal: 0,
                ARCCScoreComment: '',
                ARCCProposalID: 0
            },
            arccProposalScoreList: [],
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
        arccProposal.GetARCCProposals.Get($scope.model.fullProposal.Id).then(function (result) {
            $scope.model.fullProposal = result;

            // set the arcc score proposal id to the current arcc proposal
            $scope.model.ARCCScore.ARCCProposalID = $scope.model.fullProposal.ARCCProposal.ARCCProposalID;

            // if proposal has already been scored, remove action buttons
            if ($scope.model.fullProposal.ARCCProposal.ARCCApproval === true)
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
                        $scope.getApprovalFormData();
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
                $scope.model.ARCCScore.ARCCScoreEducExp = parseInt(document.getElementById('currentval1').value);
            else if (num === 2)
                $scope.model.ARCCScore.ARCCScoreInnovation = parseInt(document.getElementById('currentval2').value);
            else if (num === 3)
                $scope.model.ARCCScore.ARCCScoreDissemination = parseInt(document.getElementById('currentval3').value);
            else if (num === 4)
                $scope.model.ARCCScore.ARCCScoreEvaluation = parseInt(document.getElementById('currentval4').value);
            else if (num === 5)
                $scope.model.ARCCScore.ARCCScoreSupport = parseInt(document.getElementById('currentval5').value);
        };

        // reset form and close panel
        $scope.cancel = function () {
            $scope.model.warningMessage = '';
            $scope.model.successMessage = '';

            // reset object
            $scope.model.ARCCScore = 
            {
                ARCCScoreEducExp: 0,
                ARCCScoreInnovation: 0,
                ARCCScoreDissemination: 0,
                ARCCScoreEvaluation: 0,
                ARCCScoreSupport: 0,
                ARCCScoreTotal: 0,
                ARCCScoreComment: ''
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

            $scope.form.NewARCCScoreForm.$setPristine(true);
            $scope.togglePanels('none');
        };

        // save ARCCScore model to db
        $scope.save = function () {

            // calculate total
            $scope.model.ARCCScore.ARCCScoreTotal = $scope.model.ARCCScore.ARCCScoreEducExp +
                                                    $scope.model.ARCCScore.ARCCScoreInnovation +
                                                    $scope.model.ARCCScore.ARCCScoreDissemination +
                                                    $scope.model.ARCCScore.ARCCScoreEvaluation +
                                                    $scope.model.ARCCScore.ARCCScoreSupport;

            scores.SaveOrUpdateARCCScore.Update($scope.model.ARCCScore).then(function (result) {
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


        /******************************************
         * These methods are for the approval panel
         ******************************************/

        // get list of all committee members and their scores for the proposal
        $scope.getApprovalFormData = function () {

            var committeeMembers = [];
            var scoreListFromDB = [];
            $scope.model.arccProposalScoreList = [];

            // get all committee members
            scores.GetARCCScores.Get().then(function(result) {
                committeeMembers = result;
            });

            // get all scores for proposal
            scores.GetARCCScores.Get($scope.model.fullProposal.ARCCProposal.ARCCProposalID).then(function(result) {
                scoreListFromDB = result;

                // create the score list to return to the View
                angular.forEach(committeeMembers, function (member) {
                    var memberScore = {};
                    memberScore.UserName = member.UserFirstName + " " + member.UserLastName;

                    // if the member has submitted a score for the proposal, add it to the list to return to View
                    angular.forEach(scoreListFromDB, function (score) {
                        if (member.UserID === score.UserID) {
                            memberScore.ARCCScoreEducExp = score.ARCCScoreEducExp;
                            memberScore.ARCCScoreInnovation = score.ARCCScoreInnovation;
                            memberScore.ARCCScoreDissemination = score.ARCCScoreDissemination;
                            memberScore.ARCCScoreEvaluation = score.ARCCScoreEvaluation;
                            memberScore.ARCCScoreSupport = score.ARCCScoreSupport;
                            memberScore.ARCCScoreTotal = score.ARCCScoreTotal;
                        }
                    });

                    // push the record into the list
                    $scope.model.arccProposalScoreList.push(memberScore);
                });

            });
            
        };

        // chair's decision to approve or deny proposal 
        $scope.approval = function() {

        };

    }]);
