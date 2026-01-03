import { MapPin, Clock, Building2 } from 'lucide-react';
import { Application } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onViewDetails?: () => void;
  className?: string;
}

const statusConfig = {
  applied: { label: 'Applied', variant: 'applied' as const },
  review: { label: 'Under Review', variant: 'review' as const },
  shortlisted: { label: 'Shortlisted', variant: 'shortlisted' as const },
  rejected: { label: 'Rejected', variant: 'rejected' as const },
};

export function ApplicationCard({ application, onViewDetails, className }: ApplicationCardProps) {
  const status = statusConfig[application.status];

  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-card card-hover border border-border/50",
      className
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {application.job.companyLogo ? (
              <img
                src={application.job.companyLogo}
                alt={application.job.company}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Job Details */}
          <div>
            <h3 className="font-semibold text-foreground">{application.job.title}</h3>
            <p className="text-sm text-muted-foreground">{application.job.company}</p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {application.job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <Badge variant={status.variant} className="flex-shrink-0">
          {status.label}
        </Badge>
      </div>

      {/* Actions */}
      {onViewDetails && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}
