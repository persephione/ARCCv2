angular.module('App').factory('scores', ['webAccess', function (webAccess) {
    return {
        GetARCCScores: webAccess.Get('GetARCCScores'),
        GetDeeScores: webAccess.Get('GetDeeScores'),
        GetSubmittedProposals: webAccess.Get('GetSubmittedProposals'),
        SaveOrUpdateARCCScore: webAccess.Get('SaveOrUpdateARCCScore'),
        SaveOrUpdateDeeScore: webAccess.Get('SaveOrUpdateDeeScore')
    };
}]);