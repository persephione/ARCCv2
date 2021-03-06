// This code was generated by RudementaryLathe on 10/6/2015 12:00:00 AM by version:1.0.5757.15819.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Contracts
{
    public interface IARCCv2UOW
    {
        // Save pending changes to the data store.
        int SaveChanges();

        // Repositories
        IRepository<T> GetRepositoryForEntityType<T>() where T : class;
    }
}
