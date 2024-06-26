﻿using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OutofOfficeWebApp.Server.Models;

namespace OutofOfficeWebApp.Server.Data
{
    public class OutofOfficeDBContext : IdentityDbContext<LoginIdentityUser>
    {
        public OutofOfficeDBContext(DbContextOptions options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<ApprovalRequest> ApprovalRequests { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<SoftUser> SoftUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().Property(e => e.SubdivisionType).HasConversion<int>();

            modelBuilder.Entity<Employee>().Property(e => e.PositionType).HasConversion<int>();

            modelBuilder.Entity<Employee>().Property(e => e.StatusType).HasConversion<int>();


            modelBuilder.Entity<LeaveRequest>().Property(e => e.AbsenceReasonType).HasConversion<int>();

            modelBuilder.Entity<LeaveRequest>().Property(e => e.RequestStatusType).HasConversion<int>();

            modelBuilder.Entity<ApprovalRequest>().Property(e => e.RequestStatusType).HasConversion<int>();


            modelBuilder.Entity<Project>().Property(e => e.ProjectType).HasConversion<int>();

            modelBuilder.Entity<Project>().Property(e => e.StatusType).HasConversion<int>();

            base.OnModelCreating(modelBuilder);
        }
    }
}