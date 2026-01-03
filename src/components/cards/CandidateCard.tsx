import { MapPin, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { JobSeeker, ApplicationStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: JobSeeker & { applicationStatus: ApplicationStatus };
  onShortlist?: () => void;
  onReject?: () => void;
  onViewProfile?: () => void;
  className?: string;
}

const statusConfig = {
  applied: { label: 'Applied', variant: 'applied' as const },
  review: { label: 'Under Review', variant: 'review' as const },
  shortlisted: { label: 'Shortlisted', variant: 'shortlisted' as const },
  rejected: { label: 'Rejected', variant: 'rejected' as const },
};

export function CandidateCard({ 
  candidate, 
  onShortlist, 
  onReject, 
  onViewProfile,
  className 
}: CandidateCardProps) {
  const status = statusConfig[candidate.applicationStatus];

  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-card card-hover border border-border/50",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-semibold text-primary-foreground flex-shrink-0">
          {candidate.name.charAt(0)}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.title}</p>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {candidate.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {candidate.experience} years exp.
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {candidate.email}
            </span>
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {candidate.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline">+{candidate.skills.length - 4}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        {onViewProfile && (
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            View Profile
          </Button>
        )}
        {candidate.applicationStatus !== 'rejected' && onReject && (
          <Button variant="outline" size="sm" onClick={onReject} className="text-destructive hover:bg-destructive/10">
            Reject
          </Button>
        )}
        {candidate.applicationStatus !== 'shortlisted' && onShortlist && (
          <Button size="sm" onClick={onShortlist} variant="success">
            Shortlist
          </Button>
        )}
      </div>
    </div>
  );
}
