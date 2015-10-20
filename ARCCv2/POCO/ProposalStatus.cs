namespace ARCCv2.POCO
{
    public class ProposalStatus
    {
        // Look up codes to reduce magic strings
        public string notSubmitted { get { return "Not Submitted"; } }
        public string submitted { get { return "Submitted - Pending Approval"; } }
        public string approved { get { return "Approved"; } }
        public string notApproved { get { return "Not Approved"; } }
    }
}
