using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARCCv2.Controllers
{
    public class ARCCProposalController : Controller
    {
        public ActionResult ARCCProposalCreate() => PartialView();

        [HttpPost]
        public ActionResult ARCCProposalCreate(HttpPostedFileBase file)
        {
            string fileName = null;

            if (file != null && file.ContentLength > 0)
                try
                {
                    fileName = file.FileName;
                    TempData["fileName"] = fileName;

                    var filePath = Path.GetTempPath() + Path.GetFileName(file.FileName);

                    file.SaveAs(filePath);
                    ViewBag.Message = "File uploaded successfully";
                }
                catch (Exception ex)
                {
                    ViewBag.Message = "ERROR:" + ex.Message.ToString();
                }
            else
            {
                ViewBag.Message = "You have not specified a file.";
            }

            string refUri = Request.UrlReferrer.AbsoluteUri;
            return Redirect(refUri + "#!/ARCCProposal/ProposalDetails");
        }

        public ActionResult ARCCProposalDetail() => PartialView();
    }
}