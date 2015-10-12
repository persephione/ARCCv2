//using DCAPI;
//using DCSharedObjects.POCO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ARCCv2.Helpers;

namespace ARCCv2.API
{
    /// <summary>
    ///     Returns the SessionKey, IpAddress and ApplicationName in a standard way for access to DCAPI and/or application managers
    /// </summary>
    /// <note>
    ///     There is a danger in putting function calls inside this class.  Apparently the WebApi router is using reflection or other
    ///     means to identify the correct method (PUT,POST,DELETE) and can see these, causing a 500 error from the routing engine.
    ///     Modify at your own risk!!!
    /// </note>
    public class DCApiController : ApiController
    {
        //public DCAuth DCAuthorization
        //{
        //    get
        //    {
        //        IEnumerable<string> headerValues = new List<string>();
        //        var auth = new DCAuth { SessionKey = null, IpAddress = null };

        //        try
        //        {
        //            headerValues = Request.Headers.GetValues("SessionKey");
        //        }
        //        catch (Exception ex)
        //        {
        //            var x = ex; // get rid of a syntax error
        //        }

        //        if (headerValues.Any())
        //        {
        //            auth.SessionKey = headerValues.ToList()[0];
        //        }

        //        auth.IpAddress = HttpContext.Current.Request.UserHostAddress;
        //        //Todo: Change auth.ApplicationName to your apps name
        //        auth.ApplicationName = ApplicationNames.FinancialBudget;

        //        return auth;
        //    }
        //}

        //private SignInAPI _signInApi;
        //public SignInAPI SignInApi
        //{
        //    get { return _signInApi ?? (_signInApi = new SignInAPI()); }
        //}

        //private SecurityAPI _securityApi;
        //public SecurityAPI SecurityApi
        //{
        //    get { return _securityApi ?? (_securityApi = new SecurityAPI()); }
        //}
    }
}