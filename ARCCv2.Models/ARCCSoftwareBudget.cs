using System;

namespace ARCCv2.Models
{
    public partial class ARCCSoftwareBudget
    {
        public int ARCCSoftwareBudgetID { get; set; }
        public int ARCCProposalID { get; set; }
        public string ARCCSoftwareName { get; set; }
        public decimal ARCCSoftwareARCCBudget { get; set; }
        public decimal ARCCSoftwareCollegeBudget { get; set; }
        public decimal ARCCSoftwareDeptBudget { get; set; }
        public decimal ARCCSoftwareOtherBudget { get; set; }
        public string ARCCSoftwareLastUpdatedBy { get; set; }
        public DateTime ARCCSoftwareLastUpdatedDate { get; set; }
    }
}
