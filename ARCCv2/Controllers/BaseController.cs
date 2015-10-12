using System.Web;
using System.Web.Mvc;
//using DCAPI;
//using DCSharedObjects.Exceptions;
//using DCSharedObjects.POCO;

namespace ARCCv2.Controllers
{
    public class BaseController : Controller
    {
        //private SecurityAPI _securityApi;
        //private SignInAPI _signInApi;

        //public SignInAPI SignInApi
        //{
        //    get { return _signInApi ?? (_signInApi = new SignInAPI()); }
        //}

        //public SecurityAPI SecurityApi
        //{
        //    get { return _securityApi ?? (_securityApi = new SecurityAPI()); }
        //}

        //public DCAuth Authorize(string cookie, string application)
        //{
        //    var auth = new DCAuth();
        //    var myCookie = Request.Cookies[cookie];

        //    if (myCookie == null)
        //    {
        //        throw new DCNotAuthorizedException("Required security components not found");
        //    }
        //    auth.ApplicationName = application;
        //    auth.SessionKey = myCookie.Value;
        //    auth.IpAddress = Request.UserHostAddress;

        //    return auth;
        //}

        public void SetMvcCookie(string name, string value)
        {
            var cookie = new HttpCookie(name) { Path = "/", Value = value };
            Response.Cookies.Set(cookie);
        }
    }
}