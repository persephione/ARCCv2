using ARCCv2.Business.Helpers;
using ARCCv2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Business.DatabaseQueries
{
    public class DeeQueries : BusinessBase
    {
        public HashSet<DeeProposal> GetAllProposalsForUser(string userName) =>
            Uow.DeeProposalRepository.GetAll()
            .Where(x => x.DeeUsername == userName).ToHashSet();
    }
}
