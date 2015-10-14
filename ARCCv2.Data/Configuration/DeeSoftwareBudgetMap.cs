using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    class DeeSoftwareBudgetMap : EntityTypeConfiguration<DeeSoftwareBudget>
    {
        public DeeSoftwareBudgetMap()
        {
            // Primary Key
            this.HasKey(t => t.DeeSoftwareBudgetID);

            // Properties
            this.Property(t => t.DeeSoftwareBudgetID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.DeeSoftwareName)
                .HasMaxLength(50);

            this.Property(t => t.DeeSoftwareLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("DeeSoftwareBudget");
            this.Property(t => t.DeeSoftwareBudgetID).HasColumnName("DeeSoftwareBudgetID");
            this.Property(t => t.DeeProposalID).HasColumnName("DeeProposalID");
            this.Property(t => t.DeeSoftwareName).HasColumnName("DeeSoftwareName");
            this.Property(t => t.DeeSoftwareDeeBudget).HasColumnName("DeeSoftwareARCCBudget");
            this.Property(t => t.DeeSoftwareCollegeBudget).HasColumnName("DeeSoftwareCollegeBudget");
            this.Property(t => t.DeeSoftwareDeptBudget).HasColumnName("DeeSoftwareDeptBudget");
            this.Property(t => t.DeeSoftwareOtherBudget).HasColumnName("DeeSoftwareOtherBudget");
            this.Property(t => t.DeeSoftwareLastUpdatedBy).HasColumnName("DeeSoftwareLastUpdatedBy");
            this.Property(t => t.DeeSoftwareLastUpdatedDate).HasColumnName("DeeSoftwareLastUpdatedDate");
        }
    }
}
