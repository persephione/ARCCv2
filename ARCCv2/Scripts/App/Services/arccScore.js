angular.module('App').factory('arccScore', ['webAccess', function (webAccess) {
    return {
        GetARCCScores: webAccess.Get('GetARCCScores'),
        SaveOrUpdateARCCScore: webAccess.Get('SaveOrUpdateARCCScore')
    };
}]);