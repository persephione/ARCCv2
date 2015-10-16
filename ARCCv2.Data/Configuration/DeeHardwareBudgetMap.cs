using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class DeeHardwareBudgetMap : EntityTypeConfiguration<DeeHardwareBudget>
    {
        public DeeHardwareBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.DeeHardwareBudgetID);

            // Properties
            this.Property(t => t.DeeHardwareBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.DeeHardwareLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("DeeHardwareBudget");
            this.Property(t => t.DeeHardwareBudgetID).HasColumnName("DeeHardwareBudgetID");
            this.Property(t => t.DeeProposalID).HasColumnName("DeeProposalID");
            this.Property(t => t.DeeHardwareName).HasColumnName("DeeHardwareName");
            this.Property(t => t.DeeHardwareDeeBudget).HasColumnName("DeeHardwareDeeBudget");
            this.Property(t => t.DeeHardwareCollegeBudget).HasColumnName("DeeHardwareCollegeBudget");
            this.Property(t => t.DeeHardwareDeptBudget).HasColumnName("DeeHardwareDeptBudget");
            this.Property(t => t.DeeHardwareOtherBudget).HasColumnName("DeeHardwareOtherBudget");
            this.Property(t => t.DeeHardwareLastUpdatedBy).HasColumnName("DeeHardwareLastUpdatedBy");
            this.Property(t => t.DeeHardwareLastUpdatedDate).HasColumnName("DeeHardwareLastUpdatedDate");
        }
    }
}
