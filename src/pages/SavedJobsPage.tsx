import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/cards/JobCard';
import { mockSavedJobs } from '@/data/mockData';
import { Heart } from 'lucide-react';

export default function SavedJobsPage() {
  return (
    <DashboardLayout 
      title="Saved Jobs"
      subtitle={`${mockSavedJobs.length} jobs saved`}
    >
      <div className="space-y-4">
        {mockSavedJobs.length > 0 ? (
          mockSavedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSave={() => {}}
              onApply={() => {}}
              showApplicants
            />
          ))
        ) : (
          <div className="text-center py-12 rounded-xl bg-card border border-border/50">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No saved jobs</h3>
            <p className="text-muted-foreground">Jobs you save will appear here</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
