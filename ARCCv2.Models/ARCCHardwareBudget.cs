using System;

namespace ARCCv2.Models
{
    public partial class ARCCHardwareBudget
    {
        public int ARCCHardwareBudgetID { get; set; }
        public int ARCCProposalID { get; set; }
        public string ARCCHardwareName { get; set; }
        public decimal ARCCHardwareARCCBudget { get; set; }
        public decimal ARCCHardwareCollegeBudget { get; set; }
        public decimal ARCCHardwareDeptBudget { get; set; }
        public decimal ARCCHardwareOtherBudget { get; set; }
        public string ARCCHardwareLastUpdatedBy { get; set; }
        public DateTime ARCCHardwareLastUpdatedDate { get; set; }
    }
}
