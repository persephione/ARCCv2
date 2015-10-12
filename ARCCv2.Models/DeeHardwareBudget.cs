using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class DeeHardwareBudget
    {
        public int DeeHardwareBudgetID { get; set; }
        public int DeeProposalID { get; set; }
        public string DeeSoftwareName { get; set; }
        public decimal DeeSoftwareDeeBudget { get; set; }
        public decimal DeeSoftwareCollegeBudget { get; set; }
        public decimal DeeSoftwareDeptBudget { get; set; }
        public decimal DeeSoftwareOtherBudget { get; set; }
        public string DeeSoftwareLastUpdatedBy { get; set; }
        public DateTime DeeSoftwareLastUpdatedDate { get; set; }
    }
}
