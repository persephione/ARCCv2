// This code was generated by RudementaryLathe on 10/6/2015 12:00:00 AM by version:1.0.5757.15819.
using ARCCv2.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ARCCv2.Data
{
    public partial class ARCCv2DbContext : DbContext
    {
        static ARCCv2DbContext()
        {
            Database.SetInitializer<ARCCv2DbContext>(null);
        }

        public ARCCv2DbContext() : base(nameOrConnectionString: "ARCCv2")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            TableContexts.AddTableConfigurations(modelBuilder);

            ViewContexts.AddViewConfigurations(modelBuilder);

            StoredProcedureContexts.AddStoredProcedureConfigurations(modelBuilder);
        }
    }
}
