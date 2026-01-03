import { MapPin, Clock, Building2, ExternalLink, MoreHorizontal } from 'lucide-react';
import { Application } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onViewDetails?: () => void;
  compact?: boolean;
  className?: string;
}

const statusConfig = {
  applied: { 
    label: 'Applied', 
    variant: 'applied' as const,
    dotColor: 'bg-info',
    bgColor: 'bg-info/5',
    borderColor: 'border-info/20'
  },
  review: { 
    label: 'Under Review', 
    variant: 'review' as const,
    dotColor: 'bg-warning',
    bgColor: 'bg-warning/5',
    borderColor: 'border-warning/20'
  },
  shortlisted: { 
    label: 'Shortlisted', 
    variant: 'shortlisted' as const,
    dotColor: 'bg-success',
    bgColor: 'bg-success/5',
    borderColor: 'border-success/20'
  },
  rejected: { 
    label: 'Rejected', 
    variant: 'rejected' as const,
    dotColor: 'bg-destructive',
    bgColor: 'bg-muted/50',
    borderColor: 'border-destructive/20'
  },
};

export function ApplicationCard({ application, onViewDetails, compact, className }: ApplicationCardProps) {
  const status = statusConfig[application.status];

  return (
    <div className={cn(
      "group rounded-2xl bg-card p-5 shadow-card border transition-all duration-300 hover:shadow-lg hover:border-primary/20",
      status.bgColor,
      status.borderColor,
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {application.job.companyLogo ? (
            <div className="relative">
              <img
                src={application.job.companyLogo}
                alt={application.job.company}
                className="h-14 w-14 rounded-xl object-cover shadow-sm ring-2 ring-background"
              />
              <div className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                status.dotColor
              )} />
            </div>
          ) : (
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted shadow-sm">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                status.dotColor
              )} />
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {application.job.title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">{application.job.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={status.variant} className="px-3 py-1 font-semibold">
                <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", status.dotColor)} />
                {status.label}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {application.job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
            </span>
          </div>

          {/* Progress Timeline */}
          {!compact && (
            <div className="mt-4 flex items-center gap-1">
              {['applied', 'review', 'shortlisted'].map((step, index) => {
                const stepIndex = ['applied', 'review', 'shortlisted'].indexOf(application.status);
                const isCompleted = index <= stepIndex && application.status !== 'rejected';
                const isCurrent = step === application.status;
                
                return (
                  <div key={step} className="flex items-center gap-1 flex-1">
                    <div className={cn(
                      "h-1.5 rounded-full flex-1 transition-colors",
                      isCompleted ? status.dotColor : "bg-muted"
                    )} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {onViewDetails && (
        <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Last updated {formatDistanceToNow(application.updatedAt, { addSuffix: true })}
          </p>
          <Button variant="outline" size="sm" onClick={onViewDetails} className="rounded-lg group/btn">
            View Details
            <ExternalLink className="h-3 w-3 ml-1.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
          </Button>
        </div>
      )}
    </div>
  );
}
