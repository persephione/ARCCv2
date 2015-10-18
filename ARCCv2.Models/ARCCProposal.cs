using System;

namespace ARCCv2.Models
{
    public partial class ARCCProposal
    {
        public int ARCCProposalID { get; set; }
        public string ARCCName { get; set; }
        public bool ARCCSubmitted { get; set; }
        public DateTime? ARCCSubmittedDate { get; set; }
        public bool ARCCScored { get; set; }
        public bool ARCCApproval { get; set; }
        public string ARCCDirector { get; set; }
        public string ARCCDepartment { get; set; }
        public string ARCCCollege { get; set; }
        public string ARCCUsername { get; set; }
        public string ARCCEmail { get; set; }
        public string ARCCExtension { get; set; }
        public string ARCCOtherMembers { get; set; }
        public string ARCCRepSignature { get; set; }
        public string ARCCRepComments { get; set; }
        public string ARCCChairSignature { get; set; }
        public string ARCCChairComments { get; set; }
        public string ARCCDeanSignature { get; set; }
        public string ARCCDeanComments { get; set; }
        public string ARCCITSignature { get; set; }
        public string ARCCITComments { get; set; }
        public string ARCCJustification { get; set; }
        public string ARCCJustificationAttach { get; set; }
        public string ARCCAdditionalResources { get; set; }
        public bool ARCCReplacementEquipment { get; set; }
        public string ARCCReplacementProjectName { get; set; }
        public string ARCCReplacementARCCYear { get; set; }
        public bool ARCCPartiallyFunded { get; set; }
        public int ARCCPartiallyFundedPercent { get; set; }
        public string ARCCLastUpdatedBy { get; set; }
        public DateTime ARCCLastUpdatedDate { get; set; }
    }
}
