using System.Web.Mvc;

namespace ARCCv2.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/

        public ActionResult SampleAccountPage()
        {
            return PartialView();
        }
    }
}