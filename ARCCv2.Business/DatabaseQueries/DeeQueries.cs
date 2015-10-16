using ARCCv2.Business.Helpers;
using ARCCv2.Models;
using System.Collections.Generic;
using System.Linq;

namespace ARCCv2.Business.DatabaseQueries
{
    public class DeeQueries : BusinessBase
    {
        public HashSet<DeeProposal> GetAllProposalsForUser(string userName) =>
            Uow.DeeProposalRepository.GetAll()
            .Where(x => x.DeeUsername == userName).ToHashSet();

        public HashSet<DeeHardwareBudget> GetAllHardwareBudgetForProposal(int proposalID) =>
            Uow.DeeHardwareBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

        public HashSet<DeeSoftwareBudget> GetAllSoftwareBudgetForProposal(int proposalID) =>
            Uow.DeeSoftwareBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

        public HashSet<DeeOtherBudget> GetAllOtherBudgetForProposal(int proposalID) =>
            Uow.DeeOtherBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();
    }
}
