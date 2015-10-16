using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API
{
    public class GetARCCProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets a list of all ARCC Proposals - tina
        /// </summary>
        /// <returns></returns>
        public List<ProposalListView> Get()
        {
            var arccProposals = arccManager.GetARCCProposals();
            return CreateProposalListViews(arccProposals);
        }

        /// <summary>
        /// Gets one arcc proposal - tina
        /// </summary>
        /// <param name="id">unique primary key for proposal</param>
        /// <returns>arcc proposal</returns>
        public Models.ARCCProposal Get(int id) => arccManager.GetARCCProposal(id);

        /// <summary>
        /// Gets a list of ARCC proposals tied to a specific user - tina
        /// </summary>
        /// <param name="id">unique user primary id</param>
        /// <returns></returns>
        public List<Models.ARCCProposal> Post([FromBody] string userName) => arccManager.GetARCCProposals(userName);

    }
}