using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class DeeOtherBudget
    {
        public int DeeOtherBudgetID { get; set; }
        public int DeeProposalID { get; set; }
        public string DeeOtherName { get; set; }
        public decimal DeeOtherDeeBudget { get; set; }
        public decimal DeeOtherCollegeBudget { get; set; }
        public decimal DeeOtherDeptBudget { get; set; }
        public decimal DeeOtherOtherBudget { get; set; }
        public string DeeOtherLastUpdatedBy { get; set; }
        public DateTime DeeOtherLastUpdatedDate { get; set; }
    }
}
