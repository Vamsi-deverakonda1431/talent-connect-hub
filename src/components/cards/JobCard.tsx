import { MapPin, Clock, DollarSign, Users, Heart, Briefcase } from 'lucide-react';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onApply?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  showApplicants?: boolean;
  className?: string;
}

export function JobCard({ job, onApply, onSave, isSaved, showApplicants, className }: JobCardProps) {
  const jobTypeColors: Record<string, string> = {
    'full-time': 'bg-success/10 text-success',
    'part-time': 'bg-info/10 text-info',
    'contract': 'bg-warning/10 text-warning',
    'internship': 'bg-primary/10 text-primary',
    'remote': 'bg-accent/10 text-accent',
  };

  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-card card-hover border border-border/50",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            {onSave && (
              <button
                onClick={onSave}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isSaved 
                    ? "text-destructive bg-destructive/10" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
              </button>
            )}
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {job.salary}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDistanceToNow(job.postedAt, { addSuffix: true })}
            </span>
            {showApplicants && (
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {job.applicantsCount} applicants
              </span>
            )}
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className={jobTypeColors[job.type] || 'bg-muted text-muted-foreground'}>
              {job.type.replace('-', ' ')}
            </Badge>
            {job.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline">+{job.skills.length - 3}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {onApply && (
        <div className="mt-4 flex justify-end">
          <Button onClick={onApply}>Apply Now</Button>
        </div>
      )}
    </div>
  );
}
