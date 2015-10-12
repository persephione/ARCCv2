using System;
using System.Web.Optimization;

namespace ARCCv2.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/Scripts").Include(
                "~/Scripts/JQuery/jquery-{version}.js",
                "~/Scripts/JQuery/jquery-migrate-{version}.js", //older IE support
                "~/Scripts/bootstrap.js",
                "~/Scripts/Angular/angular.js",
                "~/Scripts/Angular/angular-cookies.js",
                "~/Scripts/Angular/angular-resource.js",
                "~/Scripts/Angular/angular-route.js",
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js", 
                "~/Scripts/Startup/homeModule.js",
                "~/Scripts/Startup/webAccess.js"
                            ));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/Content/app.css",
                "~/Content/bootstrap.css"
                )); //Application Specific Styles

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/App/Startup").IncludeDirectory("~/Scripts/Startup", "*.js", true));
            bundles.Add(new ScriptBundle("~/App/Controllers").IncludeDirectory("~/Scripts/App/Controllers", "*.js", true));
            bundles.Add(new ScriptBundle("~/App/Dialogs").IncludeDirectory("~/Scripts/App/Dialogs", "*.js", true));
            bundles.Add(new ScriptBundle("~/App/Directives").IncludeDirectory("~/Scripts/App/Directives", "*.js", true));
            bundles.Add(new ScriptBundle("~/App/Filters").IncludeDirectory("~/Scripts/App/Filters", "*.js", true));
            bundles.Add(new ScriptBundle("~/App/Services").IncludeDirectory("~/Scripts/App/Services", "*.js", true));
        }
    }
}