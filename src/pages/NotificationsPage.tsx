import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell, Briefcase, MessageSquare, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mockNotifications = [
  {
    id: 1,
    type: 'application',
    title: 'Application Status Update',
    message: 'Your application for Senior Frontend Developer at TechCorp Inc. has been shortlisted!',
    time: '2 hours ago',
    read: false,
    icon: Briefcase,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from DesignHub regarding your application.',
    time: '5 hours ago',
    read: false,
    icon: MessageSquare,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 3,
    type: 'info',
    title: 'Profile Reminder',
    message: 'Complete your profile to increase your chances of getting hired!',
    time: '1 day ago',
    read: true,
    icon: Info,
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    id: 4,
    type: 'application',
    title: 'Application Received',
    message: 'Your application for Backend Engineer at DataFlow has been received.',
    time: '2 days ago',
    read: true,
    icon: CheckCircle,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
];

export default function NotificationsPage() {
  return (
    <DashboardLayout 
      title="Notifications"
      subtitle="Stay updated on your activity"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {mockNotifications.filter(n => !n.read).length} unread notifications
          </p>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>

        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl bg-card shadow-card border border-border/50 transition-colors",
                !notification.read && "bg-primary/5 border-primary/20"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                notification.iconBg
              )}>
                <notification.icon className={cn("h-5 w-5", notification.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{notification.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
