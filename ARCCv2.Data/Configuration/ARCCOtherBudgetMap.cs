using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class ARCCOtherBudgetMap : EntityTypeConfiguration<ARCCOtherBudget>
    {
        public ARCCOtherBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.ARCCOtherBudgetID);

            // Properties
            this.Property(t => t.ARCCOtherBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ARCCOtherName)
                .HasMaxLength(50);

            this.Property(t => t.ARCCOtherLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("ARCCOtherBudget");
            this.Property(t => t.ARCCOtherBudgetID).HasColumnName("ARCCOtherBudgetID");
            this.Property(t => t.ARCCProposalID).HasColumnName("ARCCProposalID");
            this.Property(t => t.ARCCOtherName).HasColumnName("ARCCOtherName");
            this.Property(t => t.ARCCOtherARCCBudget).HasColumnName("ARCCOtherARCCBudget");
            this.Property(t => t.ARCCOtherCollegeBudget).HasColumnName("ARCCOtherCollegeBudget");
            this.Property(t => t.ARCCOtherDeptBudget).HasColumnName("ARCCOtherDeptBudget");
            this.Property(t => t.ARCCBudgetOther).HasColumnName("ARCCBudgetOther");
            this.Property(t => t.ARCCOtherLastUpdatedBy).HasColumnName("ARCCOtherLastUpdatedBy");
            this.Property(t => t.ARCCOtherLastUpdatedDate).HasColumnName("ARCCOtherLastUpdatedDate");
        }
    }
}
