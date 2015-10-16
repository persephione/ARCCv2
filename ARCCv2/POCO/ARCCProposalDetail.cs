using ARCCv2.Models;
using System.Collections.Generic;

namespace ARCCv2.POCO
{
    public class ARCCProposalDetail
    {
        public ARCCProposal ARCCProposal { get; set; }
        public List<ARCCHardwareBudget> HardwareBudgetList { get; set; }
        public List<ARCCSoftwareBudget> SoftwareBudgetList { get; set; }
        public List<ARCCOtherBudget> OtherBudgetList { get; set; }
    }
}
