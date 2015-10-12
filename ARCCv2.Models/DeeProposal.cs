using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class DeeProposal
    {
        public int DeeProposalID { get; set; }
        public string DeeName { get; set; }
        public bool DeeScored { get; set; }
        public bool DeeApproval { get; set; }
        public string DeeDirector { get; set; }
        public string DeeDepartment { get; set; }
        public string DeeCollege { get; set; }
        public string DeeUsername { get; set; }
        public string DeeEmail { get; set; }
        public string DeeExtension { get; set; }
        public string DeeOtherMembers { get; set; }
        public string DeeRepSignature { get; set; }
        public string DeeRepComments { get; set; }
        public string DeeChairSignature { get; set; }
        public string DeeChairComments { get; set; }
        public string DeeDeanSignature { get; set; }
        public string DeeDeanComments { get; set; }
        public string DeeAbstract { get; set; }
        public string DeeObjectAndGoals { get; set; }
        public string DeeCoursesPrograms { get; set; }
        public string DeeSuccess { get; set; }
        public string DeeTimeline { get; set; }
        public string DeeJustificationAttach { get; set; }
        public bool ARCCPartiallyFunded { get; set; }
        public int ARCCPartiallyFundedPercent { get; set; }
        public string DeeLastUpdatedBy { get; set; }
        public DateTime DeeLastUpdatedTime { get; set; }
    }
}
