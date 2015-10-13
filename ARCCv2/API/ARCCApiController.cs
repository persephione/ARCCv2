using ARCCv2.Business.Managers;
using System.Web.Http;

namespace ARCCv2.API
{
    public class ARCCApiController : ApiController
    {
        private ARCCManager _arccManager;
        private DeeManager _deeManager;

        public ARCCManager arccManager => _arccManager ?? (_arccManager = new ARCCManager());
        public DeeManager deeManager => _deeManager ?? (_deeManager = new DeeManager());
    }
}