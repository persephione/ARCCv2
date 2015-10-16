angular.module('App', [
    'ui.bootstrap',
    'ngCookies',
    'ngRoute',
    'ngTable',
    'mgcrea.ngStrap',
    'ngAnimate'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    //Index is default route
    $routeProvider.when('/', {
        redirectTo: "Home/Welcome/"
    })
    .when('/Home/Welcome', {
        templateUrl: 'Home/Welcome',
        controller: 'appCtrl'
    })
    .when('/Home/UserDashboard', {
        templateUrl: 'Home/UserDashboard',
        controller: 'userDashboardCtrl'
    })
    .when('/Home/ScoringDashboard', {
        templateUrl: 'Home/ScoringDashboard',
        controller: 'scoringDashboardCtrl'
    })
    .when('/ARCCProposal/ARCCProposalDashboard', {
        templateUrl: 'ARCCProposal/ARCCProposalDashboard',
        controller: 'arccProposalDashboardCtrl'
    })
    .when('/ARCCProposal/ARCCProposalCreate', {
        templateUrl: 'ARCCProposal/ARCCProposalCreate',
        controller: 'arccProposalCreateCtrl'
    })
    .when('/ARCCProposal/ARCCProposalDetail', {
        templateUrl: 'ARCCProposal/ARCCProposalDetail',
        controller: 'arccProposalDetailCtrl'
    })
    .when('/DeeProposal/DeeProposalDashboard', {
        templateUrl: 'DeeProposal/DeeProposalDashboard',
        controller: 'deeProposalDashboardCtrl'
    })
    .when('/DeeProposal/DeeProposalCreate', {
        templateUrl: 'DeeProposal/DeeProposalCreate',
        controller: 'deeProposalCreateCtrl'
    })
    .when('/DeeProposal/DeeProposalDetail', {
        templateUrl: 'DeeProposal/DeeProposalDetail',
        controller: 'deeProposalDetailCtrl'
    })
    .when('/Scores/ARCCProposalToScore', {
        templateUrl: 'Scores/ARCCProposalToScore',
        controller: 'arccProposalToScoreCtrl'
    })
    .when('/Scores/DeeProposalToScore', {
        templateUrl: 'Scores/DeeProposalToScore',
        controller: 'deeProposalToScoreCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    // Specify HTML5 mode (using the History APIs) or HashBang syntax.
    $locationProvider.html5Mode(false).hashPrefix('!');
    //$locationProvider.html5Mode(true);
}]);