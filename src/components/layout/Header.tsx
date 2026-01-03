import { Bell, Search, Menu, ChevronDown, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();

  const notifications = [
    { id: 1, type: 'success', message: 'Application shortlisted!' },
    { id: 2, type: 'info', message: 'New message from TechCorp' },
    { id: 3, type: 'warning', message: 'Complete your profile' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="w-72 pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-xl"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
            <Sun className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative rounded-xl h-10 w-10">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground shadow-lg">
              3
            </span>
          </Button>

          {/* Divider */}
          <div className="h-8 w-px bg-border mx-1" />

          {/* User Menu */}
          <button className="flex items-center gap-3 rounded-xl p-1.5 pr-3 hover:bg-muted/50 transition-colors">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-sm font-semibold text-primary-foreground shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-background" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-foreground">{user?.name?.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">Job Seeker</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
          </button>
        </div>
      </div>

      {/* Breadcrumb / Context Bar */}
      <div className="flex items-center gap-2 px-6 py-2 bg-muted/30 border-t border-border/50">
        <span className="text-xs text-muted-foreground">Home</span>
        <span className="text-xs text-muted-foreground">/</span>
        <span className="text-xs font-medium text-foreground">{title}</span>
      </div>
    </header>
  );
}
