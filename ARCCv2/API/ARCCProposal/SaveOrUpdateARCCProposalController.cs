using ARCCv2.Models;
using System.Web.Http;

namespace ARCCv2.API
{
    public class SaveOrUpdateARCCProposalController : ARCCApiController
    {
        /// <summary>
        /// Saves new or updates existing arcc proposal. - tina
        /// </summary>
        /// <param name="arccProposal">arcc proposal object</param>
        /// <returns>Number of records saved in db</returns>
        public int Post([FromBody] ARCCv2.Models.ARCCProposal arccProposal) => arccManager.SaveOrUpdateARCCProposal(arccProposal);
    }
}