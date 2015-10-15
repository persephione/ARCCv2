using ARCCv2.API;
using System;
using System.Collections.Generic;

namespace ARCCv2.POCO
{
    public class ProposalListView
    {
        public int ProposalID { get; set; }
        public string ProposalName { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}
