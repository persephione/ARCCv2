using ARCCv2.Models;
using System.Collections.Generic;

namespace ARCCv2.POCO
{
    public class DeeProposalDetail
    {
        public DeeProposal DeeProposal { get; set; }
        public List<DeeHardwareBudget> HardwareBudgetList { get; set; }
        public List<DeeSoftwareBudget> SoftwareBudgetList { get; set; }
        public List<DeeOtherBudget> OtherBudgetList { get; set; }
    }
}
