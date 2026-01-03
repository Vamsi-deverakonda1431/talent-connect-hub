import { MapPin, Clock, DollarSign, Users, Heart, Briefcase, Bookmark, ArrowUpRight } from 'lucide-react';
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
  compact?: boolean;
  className?: string;
}

export function JobCard({ job, onApply, onSave, isSaved, showApplicants, compact, className }: JobCardProps) {
  const jobTypeConfig: Record<string, { bg: string; text: string }> = {
    'full-time': { bg: 'bg-success/10', text: 'text-success' },
    'part-time': { bg: 'bg-info/10', text: 'text-info' },
    'contract': { bg: 'bg-warning/10', text: 'text-warning' },
    'internship': { bg: 'bg-primary/10', text: 'text-primary' },
    'remote': { bg: 'bg-accent/10', text: 'text-accent' },
  };

  const typeStyle = jobTypeConfig[job.type] || { bg: 'bg-muted', text: 'text-muted-foreground' };

  return (
    <div className={cn(
      "group rounded-2xl bg-card p-5 shadow-card border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="h-14 w-14 rounded-xl object-cover shadow-sm ring-2 ring-background"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 shadow-sm">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
            </div>
            {onSave && (
              <button
                onClick={onSave}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200",
                  isSaved 
                    ? "bg-destructive/10 text-destructive shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Bookmark className={cn("h-5 w-5 transition-transform", isSaved && "fill-current scale-110")} />
              </button>
            )}
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                <DollarSign className="h-3.5 w-3.5" />
                {job.salary}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatDistanceToNow(job.postedAt, { addSuffix: true })}
            </span>
            {showApplicants && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {job.applicantsCount} applicants
              </span>
            )}
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className={cn(typeStyle.bg, typeStyle.text, "font-medium border-0")}>
              {job.type.replace('-', ' ')}
            </Badge>
            {job.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="font-medium">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline" className="font-medium">+{job.skills.length - 3}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {onApply && (
        <div className="mt-4 pt-4 border-t border-border/50 flex justify-end gap-2">
          <Button variant="outline" className="rounded-xl">View Details</Button>
          <Button onClick={onApply} className="rounded-xl group/btn">
            Apply Now
            <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
