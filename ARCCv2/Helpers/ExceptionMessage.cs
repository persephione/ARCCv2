using System;

namespace ARCCv2.Helpers
{
    //// Written by Dave Thresher - 9/10/2013

    /// <summary>
    ///     Often an exception coming from a multi tiered environment or Entity Framework will contain
    ///     inner (and possibly inner inner) exceptions.  This helper method will recursively drill down
    ///     to the innermost exception, which by convention should have the message with the most meaning.
    ///     USAGE: var message = ExceptionMessage.Get(exception object);
    /// </summary>
    public static class ExceptionMessage
    {
        /// <summary>
        ///     Get the innermost message.
        /// </summary>
        /// <param name="ex">Exception Object</param>
        /// <returns>The innermost message</returns>
        public static string Get(Exception ex)
        {
            return ex.InnerException != null ? Get(ex.InnerException) : ex.Message;
        }
    }
}