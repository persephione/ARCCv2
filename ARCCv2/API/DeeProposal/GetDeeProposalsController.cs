using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ARCCv2.API.DeeProposal
{
    public class GetDeeProposalsController : ARCCApiController
    {

        public List<ARCCv2.Models.DeeProposal> Get() => deeManager.GetDeeProposals();


        public List<ARCCv2.Models.DeeProposal> Post([FromBody] string userName) => deeManager.GetDeeProposals(userName);
    }
}