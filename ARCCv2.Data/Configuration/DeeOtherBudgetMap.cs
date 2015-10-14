using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class DeeOtherBudgetMap : EntityTypeConfiguration<DeeOtherBudget>
    {
        public DeeOtherBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.DeeOtherBudgetID);

            // Properties
            this.Property(t => t.DeeOtherBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.DeeOtherName)
                .HasMaxLength(50);

            this.Property(t => t.DeeOtherLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("DeeOtherBudget");
            this.Property(t => t.DeeOtherBudgetID).HasColumnName("DeeOtherBudgetID");
            this.Property(t => t.DeeProposalID).HasColumnName("DeeProposalID");
            this.Property(t => t.DeeOtherName).HasColumnName("DeeOtherName");
            this.Property(t => t.DeeOtherDeeBudget).HasColumnName("DeeOtherARCCBudget");
            this.Property(t => t.DeeOtherCollegeBudget).HasColumnName("DeeOtherCollegeBudget");
            this.Property(t => t.DeeOtherDeptBudget).HasColumnName("DeeOtherDeptBudget");
            this.Property(t => t.DeeOtherOtherBudget).HasColumnName("DeeOtherOtherBudget");
            this.Property(t => t.DeeOtherLastUpdatedBy).HasColumnName("DeeOtherLastUpdatedBy");
            this.Property(t => t.DeeOtherLastUpdatedDate).HasColumnName("DeeOtherLastUpdatedDate");
        }
    }
}
