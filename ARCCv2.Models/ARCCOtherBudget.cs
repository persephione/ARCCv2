using System;

namespace ARCCv2.Models
{
    public partial class ARCCOtherBudget
    {
        public int ARCCOtherBudgetID { get; set; }
        public int ARCCProposalID { get; set; }
        public string ARCCOtherName { get; set; }
        public decimal ARCCOtherARCCBudget { get; set; }
        public decimal ARCCOtherCollegeBudget { get; set; }
        public decimal ARCCOtherDeptBudget { get; set; }
        public decimal ARCCBudgetOther { get; set; }
        public string ARCCOtherLastUpdatedBy { get; set; }
        public DateTime ARCCOtherLastUpdatedDate { get; set; }
    }
}
