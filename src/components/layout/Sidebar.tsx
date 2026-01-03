import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  FileText,
  Heart,
  Bell,
  MessageSquare,
  Building2,
  UserCircle,
  BarChart3,
  ShieldCheck,
  FolderKanban,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: UserRole[];
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['job_seeker', 'employer', 'admin'] },
  { icon: Briefcase, label: 'Browse Jobs', href: '/jobs', roles: ['job_seeker'], badge: 847 },
  { icon: FileText, label: 'My Applications', href: '/applications', roles: ['job_seeker'], badge: 4 },
  { icon: Heart, label: 'Saved Jobs', href: '/saved', roles: ['job_seeker'], badge: 3 },
  { icon: UserCircle, label: 'My Profile', href: '/profile', roles: ['job_seeker'] },
  { icon: FolderKanban, label: 'Job Postings', href: '/employer/jobs', roles: ['employer'] },
  { icon: Users, label: 'Candidates', href: '/employer/candidates', roles: ['employer'] },
  { icon: Building2, label: 'Company Profile', href: '/employer/company', roles: ['employer'] },
  { icon: Users, label: 'User Management', href: '/admin/users', roles: ['admin'] },
  { icon: Briefcase, label: 'Job Moderation', href: '/admin/jobs', roles: ['admin'] },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', roles: ['admin'] },
  { icon: ShieldCheck, label: 'Master Data', href: '/admin/master-data', roles: ['admin'] },
  { icon: MessageSquare, label: 'Messages', href: '/messages', roles: ['job_seeker', 'employer'], badge: 2 },
  { icon: Bell, label: 'Notifications', href: '/notifications', roles: ['job_seeker', 'employer', 'admin'], badge: 3 },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ['job_seeker', 'employer', 'admin'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => role && item.roles.includes(role));

  const getRoleLabel = (role: UserRole | null) => {
    switch (role) {
      case 'job_seeker': return 'Job Seeker';
      case 'employer': return 'Employer';
      case 'admin': return 'Administrator';
      default: return '';
    }
  };

  // Group navigation items
  const mainNav = filteredNavItems.filter(item => 
    ['Dashboard', 'Browse Jobs', 'My Applications', 'Saved Jobs', 'My Profile', 'Job Postings', 'Candidates', 'Company Profile', 'User Management', 'Job Moderation', 'Analytics', 'Master Data'].includes(item.label)
  );
  
  const secondaryNav = filteredNavItems.filter(item => 
    ['Messages', 'Notifications', 'Settings'].includes(item.label)
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg">
          <Briefcase className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight">JobPortal</span>
          <span className="block text-[10px] uppercase tracking-wider text-sidebar-foreground/50">Recruitment Platform</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground ring-2 ring-sidebar-accent">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-success border-2 border-sidebar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name || 'Guest'}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{getRoleLabel(role)}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="mb-2">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">Main Menu</p>
          <ul className="space-y-1">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                        isActive 
                          ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" 
                          : "bg-sidebar-accent text-sidebar-foreground/70"
                      )}>
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">Support</p>
          <ul className="space-y-1">
            {secondaryNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                        isActive 
                          ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" 
                          : "bg-primary text-primary-foreground"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Help Card */}
      <div className="px-3 pb-3">
        <div className="rounded-xl bg-gradient-to-br from-sidebar-primary/20 to-sidebar-accent p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary/30 mb-3">
            <HelpCircle className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <p className="text-xs font-semibold mb-1">Need Help?</p>
          <p className="text-[10px] text-sidebar-foreground/60 mb-3">Check our documentation or contact support</p>
          <button className="w-full rounded-lg bg-sidebar-primary py-2 text-xs font-medium text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors">
            View Help Center
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
