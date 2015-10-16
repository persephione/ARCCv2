angular.module('App').factory('shared', ['webAccess', function (webAccess) {
    return {
        GetProposals: webAccess.Get('GetProposals')
    };
}]);