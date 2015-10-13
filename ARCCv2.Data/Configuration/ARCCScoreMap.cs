using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class ARCCScoreMap : EntityTypeConfiguration<ARCCScore>
    {
        public ARCCScoreMap()
        {
            // Primary Key
            this.HasKey(t => t.ARCCScoreID);

            // Properties
            this.Property(t => t.ARCCScoreID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ScoreLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("ARCCScore");
            this.Property(t => t.ARCCScoreID).HasColumnName("ARCCScoreID");
            this.Property(t => t.ARCCScoreEducExp).HasColumnName("ARCCScoreEducExp");
            this.Property(t => t.ARCCScoreSupport).HasColumnName("ARCCScoreSupport");
            this.Property(t => t.ARCCScoreEvaluation).HasColumnName("ARCCScoreEvaluation");
            this.Property(t => t.ARCCScoreInnovation).HasColumnName("ARCCScoreInnovation");
            this.Property(t => t.ARCCScoreDissemination).HasColumnName("ARCCScoreDissemination");
            this.Property(t => t.ARCCScoreTotal).HasColumnName("ARCCScoreTotal");
            this.Property(t => t.ARCCScoreComment).HasColumnName("ARCCScoreComment");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.ARCCProposalID).HasColumnName("ARCCProposalID");
            this.Property(t => t.ScoreLastUpdatedBy).HasColumnName("ScoreLastUpdatedBy");
            this.Property(t => t.ScoreLastUpdatedDate).HasColumnName("ScoreLastUpdatedDate");
        }
    }
}
