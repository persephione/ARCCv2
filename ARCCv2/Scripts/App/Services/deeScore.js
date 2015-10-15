angular.module('App').factory('deeScore', ['webAccess', function (webAccess) {
    return {
        GetDeeProposals: webAccess.Get('GetDeeProposals'),
        SaveOrUpdateDeeProposal: webAccess.Get('SaveOrUpdateDeeProposal')
    };
}]);