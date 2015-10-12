//using DCAPI;
//using DCAPI.Utilities;
using System.Reflection;
using System.Web.Mvc;
using ARCCv2.Helpers;
using ApplicationNames = ARCCv2.Helpers.ApplicationNames;

namespace ARCCv2.Controllers
{
    public class AppController : BaseController
    {
        public class IndexModel
        {
            public bool IsDevelopmentMode { get; set; }
            public string AssemblyInformationalVersion { get; set; }
        }

        public ActionResult Index()
        {
            var sessionKey = TempData[SharedStrings.SessionKey] as string;
            //var appPortal = SignInApi.GetApplicationEntryPointURL(ApplicationNames.DCPortal);

            // Set up the cookies for this session - or get the session key on a refresh
            if (sessionKey != null)
            {
                SetMvcCookie(SharedStrings.AppSessionKeyName, sessionKey);
            }
            // Instead of redirecting, we need to send the page out and capture the missing cookie from webAccess.
            // It will then show the Sign In dialog.

            //else
            //{
            //    HttpCookie cookies = Request.Cookies[SharedStrings.AppSessionKeyName];

            //    if (cookies != null && cookies.Value != null && cookies.Value.Length > 0)
            //    {
            //        sessionKey = cookies.Value;
            //    }
            //    else
            //    {
            //        return Redirect(appPortal);
            //    }
            //}
            //SetMvcCookie(SharedStrings.PortalUrl, appPortal);

            //var indexModel = new IndexModel
            //{
            //    IsDevelopmentMode = DCSystemValues.Instance.IsDevelopmentMode,
            //    AssemblyInformationalVersion =
            //        AssemblyInfoUtility.GetAssemblyInformationalVersion(Assembly.GetExecutingAssembly())
            //};

            //return View(indexModel);
            return View();
        }

        public ActionResult DetailedApplicationVersionInformation()
        {
            return PartialView();
        }
    }
}

