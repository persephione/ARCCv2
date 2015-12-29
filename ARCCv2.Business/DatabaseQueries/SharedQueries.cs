using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Business.DatabaseQueries
{
    public class SharedQueries : BusinessBase
    {
        /// <summary>
        /// Gets the status names from status table. - tina
        /// </summary>
        /// <returns>Dictionary id and value pair</returns>
        public Dictionary<int, string> GetStatusNames() => Uow.StatusRepository.GetAll()
            .ToDictionary(x => x.StatusId, x => x.StatusDescription);
           
    }
}
