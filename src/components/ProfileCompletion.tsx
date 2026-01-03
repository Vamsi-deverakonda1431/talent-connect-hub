import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCompletionProps {
  percentage: number;
  items?: { label: string; completed: boolean }[];
}

export function ProfileCompletion({ percentage, items }: ProfileCompletionProps) {
  const defaultItems = [
    { label: 'Basic Information', completed: true },
    { label: 'Work Experience', completed: true },
    { label: 'Skills & Expertise', completed: true },
    { label: 'Education History', completed: percentage >= 75 },
    { label: 'Resume Upload', completed: percentage >= 100 },
  ];

  const checklistItems = items || defaultItems;
  const completedCount = checklistItems.filter(item => item.completed).length;

  return (
    <div className="rounded-2xl bg-card overflow-hidden shadow-card border border-border/50">
      {/* Header with gradient */}
      <div className="gradient-primary p-5 text-primary-foreground">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="font-semibold">Profile Strength</h3>
          </div>
          <span className="text-3xl font-bold">{percentage}%</span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2.5 bg-primary-foreground/20" 
          indicatorClassName="bg-primary-foreground"
        />
        <p className="text-xs text-primary-foreground/70 mt-2">
          {completedCount} of {checklistItems.length} steps completed
        </p>
      </div>

      {/* Checklist */}
      <div className="p-5">
        <ul className="space-y-3">
          {checklistItems.map((item, index) => (
            <li 
              key={index} 
              className={cn(
                "flex items-center gap-3 p-2.5 rounded-xl transition-colors",
                item.completed ? "bg-success/5" : "bg-muted/50"
              )}
            >
              {item.completed ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <span className={cn(
                "text-sm font-medium flex-1",
                item.completed ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {!item.completed && (
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                  Add
                </Button>
              )}
            </li>
          ))}
        </ul>

        {percentage < 100 && (
          <Button className="w-full mt-5 group rounded-xl h-11" variant="hero">
            Complete Your Profile
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
