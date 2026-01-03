import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { ApplicationCard } from '@/components/cards/ApplicationCard';
import { JobCard } from '@/components/cards/JobCard';
import { ProfileCompletion } from '@/components/ProfileCompletion';
import { Briefcase, FileText, Heart, TrendingUp } from 'lucide-react';
import { mockApplications, mockSavedJobs, mockJobSeeker } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
  const recentApplications = mockApplications.slice(0, 3);
  const savedJobs = mockSavedJobs.slice(0, 2);

  return (
    <DashboardLayout 
      title={`Welcome back, ${mockJobSeeker.name.split(' ')[0]}!`}
      subtitle="Here's what's happening with your job search"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Applications"
            value={mockApplications.length}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Jobs"
            value="847"
            icon={Briefcase}
          />
          <StatsCard
            title="Saved Jobs"
            value={mockSavedJobs.length}
            icon={Heart}
          />
          <StatsCard
            title="Profile Views"
            value="156"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/applications">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Saved Jobs</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/saved">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} showApplicants />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCompletion percentage={mockJobSeeker.profileCompletion} />

            {/* Quick Actions */}
            <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/profile">
                    <FileText className="mr-2 h-4 w-4" />
                    Update Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
