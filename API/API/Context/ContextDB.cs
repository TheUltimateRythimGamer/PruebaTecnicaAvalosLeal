using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
    public class ContextDB : DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }
}
