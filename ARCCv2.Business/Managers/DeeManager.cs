using ARCCv2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Business.Managers
{
    public class DeeManager : BusinessBase
    {
        public List<DeeProposal> GetDeeProposals(string userName = "") =>
            userName.Length < 1 ? Uow.DeeProposalRepository.GetAll().ToList() :
            deeQueries.GetAllProposalsForUser(userName)?.OrderBy(x => x.DeeProposalID).ToList() ?? null;

        public DeeProposal GetDeeProposal(int id) => Uow.DeeProposalRepository.GetById(id);

        public List<DeeHardwareBudget> GetHardwareBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllHardwareBudgetForProposal(proposalID).ToList();

        public List<DeeSoftwareBudget> GetSoftwareBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllSoftwareBudgetForProposal(proposalID).ToList();

        public List<DeeOtherBudget> GetOtherBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllOtherBudgetForProposal(proposalID).ToList();
    }
}
