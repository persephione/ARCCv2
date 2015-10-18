using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class DeeScoreMap : EntityTypeConfiguration<DeeScore>
    {
        public DeeScoreMap()
        {
            // Primary Key
            this.HasKey(t => t.DeeScoreID);

            // Properties
            this.Property(t => t.DeeScoreID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ScoreLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("DeeScore");
            this.Property(t => t.DeeScoreID).HasColumnName("DeeScoreID");
            this.Property(t => t.DeeScoreResearch).HasColumnName("DeeScoreResearch");
            this.Property(t => t.DeeScorePedagogy).HasColumnName("DeeScorePedagogy");
            this.Property(t => t.DeeScoreSoftware).HasColumnName("DeeScoreSoftware");
            this.Property(t => t.DeeScoreEvaluation).HasColumnName("DeeScoreEvaluation");
            this.Property(t => t.DeeScoreSupport).HasColumnName("DeeScoreSupport");
            this.Property(t => t.DeeScoreTotal).HasColumnName("DeeScoreTotal");
            this.Property(t => t.DeeScoreComment).HasColumnName("DeeScoreComment");
            this.Property(t => t.UserID).HasColumnName("UserID");    
            this.Property(t => t.DeeProposalID).HasColumnName("DeeProposalID");    
            this.Property(t => t.ScoreLastUpdatedBy).HasColumnName("ScoreLastUpdatedBy");
            this.Property(t => t.ScoreLastUpdatedDate).HasColumnName("ScoreLastUpdatedDate");
        }
    }
}
