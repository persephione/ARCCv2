using System.Collections.Generic;

namespace ARCCv2.Business.Managers
{
    public class LookupManager : BusinessBase
    {
        /// <summary>
        /// Returns a Dictionary collection of status id's and names to api - tina
        /// </summary>
        /// <returns>Dictionary collection of status id and names</returns>
        public Dictionary<int, string> GetStatusNames() => sharedQueries.GetStatusNames();
        
    }
}
