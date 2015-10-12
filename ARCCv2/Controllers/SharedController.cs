using System.Web.Mvc;
//using DCAPI.POCO;
//using DCSharedObjects.POCO;
using ARCCv2.Helpers;

namespace ARCCv2.Controllers
{
    public class SharedController : BaseController
    {
        public ActionResult Xfer(string sessionKey, long ticks, string handshake)
        {
            //var sessionHandshake = new SessionHandshake
            //{
            //    HandshakeKey = handshake,
            //    IpAddress = Request.UserHostAddress,
            //    SessionKey = sessionKey,
            //    Ticks = ticks.ToString()
            //};
            //Todo: Change FinancialBudget to your app name.
            //var handshakeOutcome = SignInApi.CreateSessionFromSessionHandshake(sessionHandshake, ApplicationNames.FinancialBudget);

            //if (handshakeOutcome.Outcome)
            //{
            //    TempData[SharedStrings.SessionKey] = handshakeOutcome.SessionKey;
            //    return RedirectToAction("Index", "App");
            //}
            //var DCAuthorization = new DCAuth
            //{
            //    SessionKey = handshakeOutcome.SessionKey,
            //    IpAddress = Request.UserHostAddress
            //};
            //var portalUrl = SignInApi.GetApplicationEntryPointURL(DCAuthorization, ApplicationNames.DCPortal);
            //return Redirect(portalUrl);
            return Redirect("");
        }

        public ActionResult dcMessageBox()
        {
            return PartialView();
        }
    }
}