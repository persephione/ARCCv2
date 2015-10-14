using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ARCCv2.Models;

namespace ARCCv2.Data.Configuration
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            // Primary Key
            this.HasKey(t => t.UserID);

            // Properties
            this.Property(t => t.UserID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.UserFirstName)
                .HasMaxLength(50);

            this.Property(t => t.UserLastName)
                .HasMaxLength(50);

            this.Property(t => t.UserEmail)
                .HasMaxLength(50);

            this.Property(t => t.UserLastUpdatedBy)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("User");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.UserFirstName).HasColumnName("UserFirstName"); 
            this.Property(t => t.UserLastName).HasColumnName("UserLastName"); 
            this.Property(t => t.UserEmail).HasColumnName("UserEmail"); 
            this.Property(t => t.UserTypeID).HasColumnName("UserTypeID");
            this.Property(t => t.UserIsActive).HasColumnName("UserIsActive");
            this.Property(t => t.UserLastUpdatedBy).HasColumnName("UserLastUpdatedBy");
            this.Property(t => t.UserLastUpdatedDate).HasColumnName("UserLastUpdatedDate");
        }
    }
}
