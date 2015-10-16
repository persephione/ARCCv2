using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API.DeeProposal
{
    public class GetDeeProposalsController : ARCCApiController
    {

        public List<Models.DeeProposal> Get() => deeManager.GetDeeProposals();

        /// <summary>
        /// Gets one dee proposal - tina
        /// </summary>
        /// <param name="id">unique primary key for proposal</param>
        /// <returns>dee proposal</returns>
        public Models.DeeProposal Get(int id) => deeManager.GetDeeProposal(id);

        public List<Models.DeeProposal> Post([FromBody] string userName) => deeManager.GetDeeProposals(userName);
    }
}