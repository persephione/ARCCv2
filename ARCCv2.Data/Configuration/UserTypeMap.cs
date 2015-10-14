using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class UserTypeMap : EntityTypeConfiguration<UserType>
    {
        public UserTypeMap()
        {
            // Primary Key
            this.HasKey(t => t.UserTypeID);

            // Properties
            this.Property(t => t.UserTypeID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.UserTypeDescription)
                .HasMaxLength(200);

            this.Property(t => t.UserTypeLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("UserType");
            this.Property(t => t.UserTypeID).HasColumnName("UserTypeID");
            this.Property(t => t.UserTypeDescription).HasColumnName("UserTypeDescription");
            this.Property(t => t.UserTypeLastUpdatedBy).HasColumnName("UserTypeLastUpdatedBy");
            this.Property(t => t.UserTypeLastUpdatedDate).HasColumnName("UserTypeLastUpdatedDate");
        }
    }
}
