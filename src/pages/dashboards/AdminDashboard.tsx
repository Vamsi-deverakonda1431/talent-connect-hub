import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { Users, Briefcase, FileText, TrendingUp, UserCheck, UserX, AlertTriangle } from 'lucide-react';
import { mockAdminStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', role: 'Job Seeker', status: 'active', date: '2 hours ago' },
    { id: 2, name: 'TechStartup Inc.', email: 'hr@techstartup.com', role: 'Employer', status: 'pending', date: '4 hours ago' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Job Seeker', status: 'active', date: '6 hours ago' },
    { id: 4, name: 'CloudScale LLC', email: 'jobs@cloudscale.com', role: 'Employer', status: 'active', date: '1 day ago' },
  ];

  const pendingJobs = [
    { id: 1, title: 'Senior Developer', company: 'NewCo Inc.', status: 'pending', date: '1 hour ago' },
    { id: 2, title: 'Marketing Manager', company: 'GrowthLabs', status: 'flagged', date: '3 hours ago' },
    { id: 3, title: 'Data Analyst', company: 'DataPro', status: 'pending', date: '5 hours ago' },
  ];

  return (
    <DashboardLayout 
      title="Admin Dashboard"
      subtitle="Platform overview and management"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={mockAdminStats.totalUsers?.toLocaleString() || '0'}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Jobs"
            value={mockAdminStats.activeJobs?.toLocaleString() || '0'}
            icon={Briefcase}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Applications"
            value={mockAdminStats.totalApplications?.toLocaleString() || '0'}
            icon={FileText}
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="New This Month"
            value={mockAdminStats.newUsersThisMonth?.toLocaleString() || '0'}
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-medium text-primary-foreground">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <UserCheck className="h-4 w-4 text-success" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <UserX className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Jobs */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Jobs Pending Review</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {pendingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{job.title}</p>
                      {job.status === 'flagged' && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.company} • {job.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                    <Button variant="success" size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Activity */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Platform Activity (Last 7 Days)</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'New Registrations', value: '342', change: '+12%' },
              { label: 'Jobs Posted', value: '89', change: '+8%' },
              { label: 'Applications Sent', value: '1,234', change: '+23%' },
              { label: 'Messages Sent', value: '567', change: '+15%' },
            ].map((metric) => (
              <div key={metric.label} className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-medium text-success mt-1">{metric.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
