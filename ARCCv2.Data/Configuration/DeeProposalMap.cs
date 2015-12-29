using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;
namespace ARCCv2.Data.Configuration
{
    public class DeeProposalMap : EntityTypeConfiguration<DeeProposal>
    {
        public DeeProposalMap()
        {
            // Primary Key
            this.HasKey(t => t.DeeProposalID);

            // Properties
            this.Property(t => t.DeeProposalID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.DeeName)
                .HasMaxLength(200);
            this.Property(t => t.DeeDirector)
                .HasMaxLength(5);
            this.Property(t => t.DeeDepartment)
                .HasMaxLength(50);
            this.Property(t => t.DeeCollege)
                .HasMaxLength(50);
            this.Property(t => t.DeeUsername)
                .HasMaxLength(50);
            this.Property(t => t.DeeEmail)
                .HasMaxLength(50);
            this.Property(t => t.DeeExtension)
                .HasMaxLength(10);
            this.Property(t => t.DeeRepSignature)
                .HasMaxLength(50);
            this.Property(t => t.DeeChairSignature)
                .HasMaxLength(50);
            this.Property(t => t.DeeDeanSignature)
                .HasMaxLength(50);
            this.Property(t => t.DeeLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("DeeProposal");
            this.Property(t => t.DeeProposalID).HasColumnName("DeeProposalID");
            this.Property(t => t.DeeName).HasColumnName("DeeName");
            this.Property(t => t.DeeSubmittedDate).HasColumnName("DeeSubmittedDate");
            this.Property(t => t.DeeDirector).HasColumnName("DeeDirector");
            this.Property(t => t.DeeDepartment).HasColumnName("DeeDepartment");
            this.Property(t => t.DeeCollege).HasColumnName("DeeCollege");
            this.Property(t => t.DeeUsername).HasColumnName("DeeUsername");
            this.Property(t => t.DeeEmail).HasColumnName("DeeEmail");
            this.Property(t => t.DeeExtension).HasColumnName("DeeExtension");
            this.Property(t => t.DeeOtherMembers).HasColumnName("DeeOtherMembers");
            this.Property(t => t.DeeRepSignature).HasColumnName("DeeRepSignature");
            this.Property(t => t.DeeRepComments).HasColumnName("DeeRepComments");
            this.Property(t => t.DeeChairSignature).HasColumnName("DeeChairSignature");
            this.Property(t => t.DeeChairComments).HasColumnName("DeeChairComments");
            this.Property(t => t.DeeDeanSignature).HasColumnName("DeeDeanSignature");
            this.Property(t => t.DeeDeanComments).HasColumnName("DeeDeanComments");
            this.Property(t => t.DeeAbstract).HasColumnName("DeeAbstract");
            this.Property(t => t.DeeObjectAndGoals).HasColumnName("DeeObjectAndGoals");
            this.Property(t => t.DeeCoursesPrograms).HasColumnName("DeeCoursesPrograms"); 
            this.Property(t => t.DeeSuccess).HasColumnName("DeeSuccess"); 
            this.Property(t => t.DeeTimeline).HasColumnName("DeeTimeline"); 
            this.Property(t => t.DeeJustificationAttach).HasColumnName("DeeJustificationAttach"); 
            this.Property(t => t.ARCCPartiallyFunded).HasColumnName("ARCCPartiallyFunded"); 
            this.Property(t => t.ARCCPartiallyFundedPercent).HasColumnName("ARCCPartiallyFundedPercent");
            this.Property(t => t.DeeLastUpdatedBy).HasColumnName("DeeLastUpdatedBy");
            this.Property(t => t.DeeLastUpdatedDate).HasColumnName("DeeLastUpdatedDate");
        }
    }
}
