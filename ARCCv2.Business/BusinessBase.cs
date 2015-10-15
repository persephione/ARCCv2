using ARCCv2.Business.DatabaseQueries;
using ARCCv2.Business.Managers;
using ARCCv2.Data;

namespace ARCCv2.Business
{
    public class BusinessBase
    {
        private ARCCv2UOW arccTaxUoW;
        protected ARCCv2UOW Uow
        {
            get
            {
                return arccTaxUoW ??
                       (arccTaxUoW = new ARCCv2UOW(new RepositoryProvider(new RepositoryFactories())));
            }
            set { arccTaxUoW = value; }
        }

        private ARCCManager _arccManager { get; set; }
        public ARCCManager arccManager => _arccManager ?? (_arccManager = new ARCCManager());

        private DeeManager _deeManager { get; set; }
        public DeeManager deeManager => _deeManager ?? (_deeManager = new DeeManager());

        private ScoreManager _scoreManager { get; set; }
        public ScoreManager scoreManager => _scoreManager ?? (_scoreManager = new ScoreManager());

        private UserManager _userManager { get; set; }
        public UserManager userManager => _userManager ?? (_userManager = new UserManager());

        private ARCCQueries _arccQueries { get; set; }
        public ARCCQueries arccQueries => _arccQueries ?? (_arccQueries = new ARCCQueries());

        private DeeQueries _deeQueries { get; set; }
        public DeeQueries deeQueries => _deeQueries ?? (_deeQueries = new DeeQueries());

        private UserQueries _userQueries { get; set; }
        public UserQueries userQueries => _userQueries ?? (_userQueries = new UserQueries());

    }
}
