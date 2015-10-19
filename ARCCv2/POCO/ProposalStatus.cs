namespace ARCCv2.POCO
{
    public class ProposalStatus
    {
        // Look up codes to reduce magic strings
        // For Scoring Dashboard
        public string isTrue { get { return "Active"; } }
        public string isFalse { get { return "Archived"; } }

        // For User Dashboard
        public string notSubmitted { get { return "Not Submitted"; } }
        public string submitted { get { return "Submitted - Pending Approval"; } }
        public string approved { get { return "Approved"; } }
        public string notApproved { get { return "Not Approved"; } }
    }
}
