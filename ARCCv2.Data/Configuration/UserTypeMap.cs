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
            //this.Property(t => t.abate_acct_id)
            //    .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            //this.Property(t => t.ssno)
            //    .HasMaxLength(9);

            //this.Property(t => t.spouse_ssno)
            //    .HasMaxLength(9);

            // Table & Column Mappings
            this.ToTable("UserType");
            //this.Property(t => t.abate_acct_id).HasColumnName("abate_acct_id");
            //this.Property(t => t.client_id).HasColumnName("client_id");
            //this.Property(t => t.date_entered).HasColumnName("date_entered");
        }
    }
}
