using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class ARCCScore
    {
        public int ARCCScoreID { get; set; }
        public int ARCCScoreEducExp { get; set; }
        public int ARCCScoreSupport { get; set; }
        public int ARCCScoreEvaluation { get; set; }
        public int ARCCScoreInnovation { get; set; }
        public int ARCCScoreDissemination { get; set; }
        public int ARCCScoreTotal { get; set; }
        public string ARCCScoreComment { get; set; }
        public int UserID { get; set; }
        public int ARCCProposalID { get; set; }
        public string ScoreLastUpdatedBy { get; set; }
        public DateTime ScoreLastUpdatedDate { get; set; }
    }
}
