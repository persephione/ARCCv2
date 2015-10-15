angular.module('App').factory('deeProposal', ['webAccess', function (webAccess) {
    return {
        GetDeeProposals: webAccess.Get('GetDeeProposals'),
        SaveOrUpdateDeeProposal: webAccess.Get('SaveOrUpdateDeeProposal')
    };
}]);