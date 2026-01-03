import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ApplicationCard } from '@/components/cards/ApplicationCard';
import { Badge } from '@/components/ui/badge';
import { mockApplications } from '@/data/mockData';
import { ApplicationStatus } from '@/types';
import { useState } from 'react';

const statusFilters: { label: string; value: ApplicationStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Applied', value: 'applied' },
  { label: 'Under Review', value: 'review' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Rejected', value: 'rejected' },
];

export default function ApplicationsPage() {
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | 'all'>('all');

  const filteredApplications = activeFilter === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === activeFilter);

  const getCounts = (status: ApplicationStatus | 'all') => {
    if (status === 'all') return mockApplications.length;
    return mockApplications.filter(app => app.status === status).length;
  };

  return (
    <DashboardLayout 
      title="My Applications"
      subtitle="Track your job applications"
    >
      <div className="space-y-6">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(filter => (
            <Badge
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label} ({getCounts(filter.value)})
            </Badge>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <ApplicationCard
                key={application.id}
                application={application}
                onViewDetails={() => {}}
              />
            ))
          ) : (
            <div className="text-center py-12 rounded-xl bg-card border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">No applications found</h3>
              <p className="text-muted-foreground">You haven't applied to any jobs yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
