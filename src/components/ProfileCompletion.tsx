import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCompletionProps {
  percentage: number;
  items?: { label: string; completed: boolean }[];
}

export function ProfileCompletion({ percentage, items }: ProfileCompletionProps) {
  const defaultItems = [
    { label: 'Basic Information', completed: true },
    { label: 'Work Experience', completed: true },
    { label: 'Skills', completed: true },
    { label: 'Education', completed: percentage >= 75 },
    { label: 'Resume Upload', completed: percentage >= 100 },
  ];

  const checklistItems = items || defaultItems;

  return (
    <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Profile Completion</h3>
        <span className="text-2xl font-bold text-primary">{percentage}%</span>
      </div>

      <Progress value={percentage} className="h-2 mb-6" />

      <ul className="space-y-3">
        {checklistItems.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            {item.completed ? (
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <span className={cn(
              "text-sm",
              item.completed ? "text-foreground" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      {percentage < 100 && (
        <Button variant="outline" className="w-full mt-6 group">
          Complete Your Profile
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </div>
  );
}
