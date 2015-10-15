namespace ARCCv2.POCO
{
    public class ProposalStatus
    {
        // Look up codes to reduce magic strings
        private string _isTrue;
        public string isTrue
        {
            get { return _isTrue; }
            set{ _isTrue = "Active"; }
        }

        private string _isFalse;
        public string isFalse
        {
            get { return _isFalse; }
            set { _isFalse = "Archived"; }
        }
    }
}
