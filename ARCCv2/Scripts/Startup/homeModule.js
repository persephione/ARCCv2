angular.module('App', [
    'ui.bootstrap',
    'ngCookies',
    'ngRoute',
    'ngTable'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    //Index is default route
    $routeProvider.when('/', {
        redirectTo: "Home/Welcome/"
    })
    .when('/Home/Welcome/', {
        templateUrl: 'Home/Welcome',
        controller: 'appCtrl'
    })
    .when('/ARCCProposal/ARCCProposalDashboard/', {
        templateUrl: 'ARCCProposal/ARCCProposalDashboard',
        controller: 'arccProposalDashboardCtrl'
    })
    .when('/ARCCProposal/proposalCreate/', {
        templateUrl: 'ARCCProposal/proposalCreate',
        controller: 'proposalCreateCtrl'
    })
    .when('/ARCCProposal/proposalDetail/', {
        templateUrl: 'ARCCProposal/proposalDetail',
        controller: 'proposalDetailCtrl'
    })
    .when('/DeeProposal/DeeProposalDashboard/', {
        templateUrl: 'DeeProposal/DeeProposalDashboard',
        controller: 'deeProposalDashboardCtrl'
    })
    .when('/DeeProposal/proposalCreate/', {
        templateUrl: 'DeeProposal/proposalCreate',
        controller: 'proposalCreateCtrl'
    })
    .when('/DeeProposal/proposalDetail/', {
        templateUrl: 'DeeProposal/proposalDetail',
        controller: 'proposalDetailCtrl'
    })

    
    .otherwise({
        redirectTo: '/'
    });

    // Specify HTML5 mode (using the History APIs) or HashBang syntax.
    $locationProvider.html5Mode(false).hashPrefix('!');
    //$locationProvider.html5Mode(true);

}]);