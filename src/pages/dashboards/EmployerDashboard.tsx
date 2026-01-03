import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { JobCard } from '@/components/cards/JobCard';
import { CandidateCard } from '@/components/cards/CandidateCard';
import { Briefcase, Users, Eye, TrendingUp, Plus } from 'lucide-react';
import { mockEmployerJobs, mockCandidates, mockEmployer } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export default function EmployerDashboard() {
  const activeJobs = mockEmployerJobs.filter(job => job.status === 'open');
  const recentCandidates = mockCandidates.slice(0, 3);

  const totalApplicants = mockEmployerJobs.reduce((sum, job) => sum + job.applicantsCount, 0);

  return (
    <DashboardLayout 
      title={`Welcome, ${mockEmployer.companyName}`}
      subtitle="Manage your job postings and candidates"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Jobs"
            value={activeJobs.length}
            icon={Briefcase}
          />
          <StatsCard
            title="Total Applicants"
            value={totalApplicants}
            icon={Users}
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Job Views"
            value="2,845"
            icon={Eye}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Hire Rate"
            value="68%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="hero" asChild>
            <Link to="/employer/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Jobs */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Active Job Postings</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/employer/jobs">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <h3 className="font-medium text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{job.applicantsCount}</p>
                      <p className="text-xs text-muted-foreground">Applicants</p>
                    </div>
                    <Badge variant={job.status === 'open' ? 'success' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Candidates */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Candidates</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/employer/candidates">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate}
                  onShortlist={() => {}}
                  onReject={() => {}}
                  onViewProfile={() => {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Hiring Pipeline</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Applied', count: 45, color: 'bg-info' },
              { label: 'Under Review', count: 23, color: 'bg-warning' },
              { label: 'Shortlisted', count: 12, color: 'bg-success' },
              { label: 'Rejected', count: 8, color: 'bg-destructive' },
            ].map((stage) => (
              <div key={stage.label} className="text-center p-4 rounded-lg bg-muted/50">
                <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-foreground">{stage.count}</p>
                <p className="text-sm text-muted-foreground">{stage.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
