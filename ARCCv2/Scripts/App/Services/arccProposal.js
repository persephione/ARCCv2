angular.module('App').factory('arccProposal', ['webAccess', function (webAccess) {
    return {
        GetARCCProposals: webAccess.Get('GetARCCProposals'),
        SaveOrUpdateARCCProposal: webAccess.Get('SaveOrUpdateARCCProposal')
    };
}]);