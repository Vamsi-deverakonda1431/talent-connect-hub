import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  iconClassName?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, description, className, iconClassName }: StatsCardProps) {
  return (
    <div className={cn(
      "group relative rounded-2xl bg-card p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 overflow-hidden",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 gradient-primary opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity" />
      
      <div className="flex items-start justify-between relative">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
              trend.isPositive 
                ? "bg-success/10 text-success" 
                : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg group-hover:scale-110 transition-transform duration-300",
          iconClassName
        )}>
          <Icon className="h-7 w-7 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
