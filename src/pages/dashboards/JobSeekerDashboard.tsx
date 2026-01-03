import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { ApplicationCard } from '@/components/cards/ApplicationCard';
import { JobCard } from '@/components/cards/JobCard';
import { ProfileCompletion } from '@/components/ProfileCompletion';
import { Briefcase, FileText, Heart, TrendingUp, Eye, ArrowRight, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { mockApplications, mockSavedJobs, mockJobSeeker, mockJobs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
  const recentApplications = mockApplications.slice(0, 3);
  const savedJobs = mockSavedJobs.slice(0, 2);
  const recommendedJobs = mockJobs.slice(0, 2);

  // Calculate application stats
  const applicationStats = {
    total: mockApplications.length,
    shortlisted: mockApplications.filter(a => a.status === 'shortlisted').length,
    inReview: mockApplications.filter(a => a.status === 'review').length,
    rejected: mockApplications.filter(a => a.status === 'rejected').length,
  };

  return (
    <DashboardLayout 
      title={`Welcome back, ${mockJobSeeker.name.split(' ')[0]}! 👋`}
      subtitle="Here's your job search overview"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Applications"
            value={applicationStats.total}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
            description="vs last month"
          />
          <StatsCard
            title="Shortlisted"
            value={applicationStats.shortlisted}
            icon={CheckCircle}
            trend={{ value: 25, isPositive: true }}
          />
          <StatsCard
            title="Saved Jobs"
            value={mockSavedJobs.length}
            icon={Heart}
          />
          <StatsCard
            title="Profile Views"
            value="156"
            icon={Eye}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Status Overview */}
            <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Application Pipeline</h2>
                  <p className="text-sm text-muted-foreground">Track your application progress</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary" asChild>
                  <Link to="/applications">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Pipeline Visualization */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Applied', count: applicationStats.total, color: 'bg-info', icon: FileText },
                  { label: 'In Review', count: applicationStats.inReview, color: 'bg-warning', icon: Clock },
                  { label: 'Shortlisted', count: applicationStats.shortlisted, color: 'bg-success', icon: CheckCircle },
                  { label: 'Rejected', count: applicationStats.rejected, color: 'bg-destructive', icon: Briefcase },
                ].map((stage) => (
                  <div key={stage.label} className="relative group">
                    <div className={`h-2 rounded-full ${stage.color} mb-3`} />
                    <div className="text-center p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors">
                      <p className="text-2xl font-bold text-foreground">{stage.count}</p>
                      <p className="text-xs text-muted-foreground font-medium">{stage.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Applications */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Recent Applications</h3>
                {recentApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                    <Heart className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Saved Jobs</h2>
                    <p className="text-sm text-muted-foreground">{mockSavedJobs.length} jobs saved for later</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary" asChild>
                  <Link to="/saved">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isSaved={true}
                    onSave={() => {}}
                    showApplicants 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <ProfileCompletion percentage={mockJobSeeker.profileCompletion} />

            {/* Quick Actions */}
            <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-xl h-11" asChild>
                  <Link to="/jobs">
                    <Briefcase className="mr-3 h-4 w-4 text-primary" />
                    Browse Jobs
                    <Badge variant="secondary" className="ml-auto">847</Badge>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl h-11" asChild>
                  <Link to="/profile">
                    <FileText className="mr-3 h-4 w-4 text-primary" />
                    Update Resume
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl h-11" asChild>
                  <Link to="/messages">
                    <Sparkles className="mr-3 h-4 w-4 text-primary" />
                    View Messages
                    <Badge className="ml-auto">2</Badge>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Recommended for You</h3>
              </div>
              <div className="space-y-3">
                {recommendedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link to="/jobs">
                    See More Recommendations
                    <ArrowRight className="ml-1 h-4 w-4" />
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
