using ARCCv2.Business.Managers;
using ARCCv2.POCO;
using System.Web.Http;

namespace ARCCv2.API
{
    public class ARCCApiController : ApiController
    {
        private ARCCManager _arccManager;
        private DeeManager _deeManager;
        private ScoreManager _scoreManager;
        private UserManager _userManager;
        private ProposalStatus _proposalStatus;

        public ARCCManager arccManager => _arccManager ?? (_arccManager = new ARCCManager());
        public DeeManager deeManager => _deeManager ?? (_deeManager = new DeeManager());
        public ScoreManager scoreManager => _scoreManager ?? (_scoreManager = new ScoreManager());
        public UserManager usermanager => _userManager ?? (_userManager = new UserManager());
        public ProposalStatus proposalStatus => _proposalStatus ?? (_proposalStatus = new ProposalStatus());
    }
}