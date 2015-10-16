using System.Web.Mvc;

namespace ARCCv2.Controllers
{
    public class ScoresController : Controller
    {
        public ActionResult Scoring() => PartialView();

        public ActionResult ARCCProposalToScore() => PartialView();

        public ActionResult DeeProposalToScore() => PartialView();
    }
}