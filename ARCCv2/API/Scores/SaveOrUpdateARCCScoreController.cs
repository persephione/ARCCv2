using ARCCv2.Models;
using System.Web.Http;

namespace ARCCv2.API.Scores
{
    public class SaveOrUpdateARCCScoreController : ARCCApiController
    {
        //TODO: Fix after authentication is working ---------------------------//
        public int Post([FromBody] ARCCScore arccScore)
        {
            // after CAS is working, get User from authentication
            var user = new User();
            user.UserID = 9;
            user.UserFirstName = "Rob";
            user.UserLastName = "Hilton";
            return scoreManager.SaveOrUpdateARCCScore(arccScore, user);
        }
    }
}