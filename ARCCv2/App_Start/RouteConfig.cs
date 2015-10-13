using System.Web.Mvc;
using System.Web.Routing;

namespace ARCCv2.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("xfer", "{controller}/{action}/{sessionKey}/{ticks}/{handshake}",
                new { controller = "Shared", action = "Xfer" }, new { controller = "^Shared$", action = "^Xfer$" }
                );

            routes.MapRoute("Index", "{controller}/{action}/{id}",
                new { controller = "App", action = "Index", id = UrlParameter.Optional }
                );
        }
    }
}