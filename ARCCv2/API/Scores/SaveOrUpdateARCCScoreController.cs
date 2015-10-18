using ARCCv2.Models;
using System.Web.Http;

namespace ARCCv2.API.Scores
{
    public class SaveOrUpdateARCCScoreController : ARCCApiController
    {
        //TODO: Fix after authentication is working ---------------------------//
        public int Put([FromBody] ARCCScore arccScore)
        {
            // after CAS is working, get User from authentication
            var user = new User();
            user.UserID = 1;
            user.UserFirstName = "mickey";
            user.UserLastName = "mouse";
            return scoreManager.SaveOrUpdateARCCScore(arccScore, user);
        }
    }
}