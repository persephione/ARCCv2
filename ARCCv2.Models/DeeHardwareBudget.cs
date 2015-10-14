using System;

namespace ARCCv2.Models
{
    public partial class DeeHardwareBudget
    {
        public int DeeHardwareBudgetID { get; set; }
        public int DeeProposalID { get; set; }
        public string DeeHardwareName { get; set; }
        public decimal DeeHardwareDeeBudget { get; set; }
        public decimal DeeHardwareCollegeBudget { get; set; }
        public decimal DeeHardwareDeptBudget { get; set; }
        public decimal DeeHardwareOtherBudget { get; set; }
        public string DeeHardwareLastUpdatedBy { get; set; }
        public DateTime DeeHardwareLastUpdatedDate { get; set; }
    }
}
