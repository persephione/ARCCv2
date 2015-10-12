using System.Web.Mvc;

namespace ARCCv2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Welcome()
        {
            return PartialView();
        }
    }
}