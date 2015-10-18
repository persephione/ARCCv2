using System;

namespace ARCCv2.Models
{
    public partial class DeeScore
    {
        public int DeeScoreID { get; set; }
        public int DeeScoreResearch { get; set; }
        public int DeeScorePedagogy { get; set; }
        public int DeeScoreSoftware { get; set; }
        public int DeeScoreEvaluation { get; set; }
        public int DeeScoreSupport { get; set; }
        public int DeeScoreTotal { get; set; }
        public string DeeScoreComment { get; set; }
        public int UserID { get; set; }
        public int DeeProposalID { get; set; }
        public string ScoreLastUpdatedBy { get; set; }
        public DateTime ScoreLastUpdatedDate { get; set; }
    }
}
