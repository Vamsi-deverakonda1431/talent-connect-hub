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
  FolderKanban
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['job_seeker', 'employer', 'admin'] },
  { icon: Briefcase, label: 'Browse Jobs', href: '/jobs', roles: ['job_seeker'] },
  { icon: FileText, label: 'My Applications', href: '/applications', roles: ['job_seeker'] },
  { icon: Heart, label: 'Saved Jobs', href: '/saved', roles: ['job_seeker'] },
  { icon: UserCircle, label: 'My Profile', href: '/profile', roles: ['job_seeker'] },
  { icon: FolderKanban, label: 'Job Postings', href: '/employer/jobs', roles: ['employer'] },
  { icon: Users, label: 'Candidates', href: '/employer/candidates', roles: ['employer'] },
  { icon: Building2, label: 'Company Profile', href: '/employer/company', roles: ['employer'] },
  { icon: Users, label: 'User Management', href: '/admin/users', roles: ['admin'] },
  { icon: Briefcase, label: 'Job Moderation', href: '/admin/jobs', roles: ['admin'] },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', roles: ['admin'] },
  { icon: ShieldCheck, label: 'Master Data', href: '/admin/master-data', roles: ['admin'] },
  { icon: MessageSquare, label: 'Messages', href: '/messages', roles: ['job_seeker', 'employer'] },
  { icon: Bell, label: 'Notifications', href: '/notifications', roles: ['job_seeker', 'employer', 'admin'] },
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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">JobPortal</span>
        </div>

        {/* User Info */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{user?.name || 'Guest'}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{getRoleLabel(role)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
