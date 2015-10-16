using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class ARCCHardwareBudgetMap : EntityTypeConfiguration<ARCCHardwareBudget>
    {
        public ARCCHardwareBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.ARCCHardwareBudgetID);

            // Properties
            this.Property(t => t.ARCCHardwareBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ARCCHardwareLastUpdatedBy)
                .HasMaxLength(50);


            // Table & Column Mappings
            this.ToTable("ARCCHardwareBudget");
            this.Property(t => t.ARCCHardwareBudgetID).HasColumnName("ARCCHardwareBudgetID");
            this.Property(t => t.ARCCProposalID).HasColumnName("ARCCProposalID");
            this.Property(t => t.ARCCHardwareName).HasColumnName("ARCCHardwareName");
            this.Property(t => t.ARCCHardwareARCCBudget).HasColumnName("ARCCHardwareARCCBudget");
            this.Property(t => t.ARCCHardwareCollegeBudget).HasColumnName("ARCCHardwareCollegeBudget");
            this.Property(t => t.ARCCHardwareDeptBudget).HasColumnName("ARCCHardwareDeptBudget");
            this.Property(t => t.ARCCHardwareOtherBudget).HasColumnName("ARCCHardwareOtherBudget");
            this.Property(t => t.ARCCHardwareLastUpdatedBy).HasColumnName("ARCCHardwareLastUpdatedBy");
            this.Property(t => t.ARCCHardwareLastUpdatedDate).HasColumnName("ARCCHardwareLastUpdatedDate");
        }
    }
}
