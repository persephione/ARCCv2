using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class ARCCProposalMap : EntityTypeConfiguration<ARCCProposal>
    {
        public ARCCProposalMap()
        {
            // Primary Key
            this.HasKey(t => t.ARCCProposalID);

            // Properties
            this.Property(t => t.ARCCProposalID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ARCCName)
                .HasMaxLength(200);

            this.Property(t => t.ARCCDirector)
                .HasMaxLength(200);
            this.Property(t => t.ARCCDepartment)
                .HasMaxLength(50);
            this.Property(t => t.ARCCCollege)
                .HasMaxLength(50);
            this.Property(t => t.ARCCUsername)
                .HasMaxLength(50);
            this.Property(t => t.ARCCEmail)
                .HasMaxLength(50);
            this.Property(t => t.ARCCExtension)
                .HasMaxLength(10);
            this.Property(t => t.ARCCRepSignature)
                .HasMaxLength(50);
            this.Property(t => t.ARCCChairSignature)
                .HasMaxLength(50);
            this.Property(t => t.ARCCDeanSignature)
                .HasMaxLength(50);
            this.Property(t => t.ARCCITSignature)
                .HasMaxLength(50);
            this.Property(t => t.ARCCJustificationAttach)
                .HasMaxLength(200);
            this.Property(t => t.ARCCReplacementProjectName)
                .HasMaxLength(200);
            this.Property(t => t.ARCCReplacementARCCYear)
                .HasMaxLength(10);
            this.Property(t => t.ARCCLastUpdatedBy)
                .HasMaxLength(50);


            // Table & Column Mappings
            this.ToTable("ARCCProposal");
            this.Property(t => t.ARCCProposalID).HasColumnName("ARCCProposalID");
            this.Property(t => t.ARCCScored).HasColumnName("ARCCScored");
            this.Property(t => t.ARCCApproval).HasColumnName("ARCCApproval");
            this.Property(t => t.ARCCDirector).HasColumnName("ARCCDirector");
            this.Property(t => t.ARCCDepartment).HasColumnName("ARCCDepartment");
            this.Property(t => t.ARCCCollege).HasColumnName("ARCCCollege");
            this.Property(t => t.ARCCUsername).HasColumnName("ARCCUsername");
            this.Property(t => t.ARCCEmail).HasColumnName("ARCCEmail");
            this.Property(t => t.ARCCExtension).HasColumnName("ARCCExtension");
            this.Property(t => t.ARCCOtherMembers).HasColumnName("ARCCOtherMembers");
            this.Property(t => t.ARCCRepSignature).HasColumnName("ARCCRepSignature");
            this.Property(t => t.ARCCRepComments).HasColumnName("ARCCRepComments");
            this.Property(t => t.ARCCChairSignature).HasColumnName("ARCCChairSignature");
            this.Property(t => t.ARCCChairComments).HasColumnName("ARCCChairComments");
            this.Property(t => t.ARCCDeanSignature).HasColumnName("ARCCDeanSignature");
            this.Property(t => t.ARCCDeanComments).HasColumnName("ARCCDeanComments");
            this.Property(t => t.ARCCITSignature).HasColumnName("ARCCITSignature");
            this.Property(t => t.ARCCITComments).HasColumnName("ARCCITComments");
            this.Property(t => t.ARCCJustification).HasColumnName("ARCCJustification");
            this.Property(t => t.ARCCJustificationAttach).HasColumnName("ARCCJustificationAttach");
            this.Property(t => t.ARCCAdditionalResources).HasColumnName("ARCCAdditionalResources");
            this.Property(t => t.ARCCReplacementEquipment).HasColumnName("ARCCReplacementEquipment");
            this.Property(t => t.ARCCReplacementProjectName).HasColumnName("ARCCReplacementProjectName");
            this.Property(t => t.ARCCReplacementARCCYear).HasColumnName("ARCCReplacementARCCYear");
            this.Property(t => t.ARCCPartiallyFunded).HasColumnName("ARCCPartiallyFunded");
            this.Property(t => t.ARCCPartiallyFundedPercent).HasColumnName("ARCCPartiallyFundedPercent");
            this.Property(t => t.ARCCLastUpdatedBy).HasColumnName("ARCCLastUpdatedBy");
            this.Property(t => t.ARCCLastUpdatedDate).HasColumnName("ARCCLastUpdatedDate");
        }
    }
}
