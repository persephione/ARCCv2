using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class ARCCSoftwareBudgetMap : EntityTypeConfiguration<ARCCSoftwareBudget>
    {
        public ARCCSoftwareBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.ARCCSoftwareBudgetID);

            // Properties
            this.Property(t => t.ARCCSoftwareBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ARCCSoftwareLastUpdatedBy)
                .HasMaxLength(50);



            // Table & Column Mappings
            this.ToTable("ARCCSoftwareBudget");
            this.Property(t => t.ARCCSoftwareBudgetID).HasColumnName("ARCCSoftwareBudgetID");
            this.Property(t => t.ARCCProposalID).HasColumnName("ARCCProposalID");
            this.Property(t => t.ARCCSoftwareName).HasColumnName("ARCCSoftwareName");
            this.Property(t => t.ARCCSoftwareARCCBudget).HasColumnName("ARCCSoftwareARCCBudget");
            this.Property(t => t.ARCCSoftwareCollegeBudget).HasColumnName("ARCCSoftwareCollegeBudget");
            this.Property(t => t.ARCCSoftwareDeptBudget).HasColumnName("ARCCSoftwareDeptBudget");
            this.Property(t => t.ARCCSoftwareOtherBudget).HasColumnName("ARCCSoftwareOtherBudget");
            this.Property(t => t.ARCCSoftwareLastUpdatedBy).HasColumnName("ARCCSoftwareLastUpdatedBy");
            this.Property(t => t.ARCCSoftwareLastUpdatedDate).HasColumnName("ARCCSoftwareLastUpdatedDate");
        }
    }
}
