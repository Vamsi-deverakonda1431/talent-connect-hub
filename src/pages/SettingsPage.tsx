import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Lock, Eye, Moon, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      title="Settings"
      subtitle="Manage your account preferences"
    >
      <div className="max-w-3xl space-y-6">
        {/* Account Settings */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Account Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input defaultValue={user?.email} type="email" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Email Notifications', description: 'Receive updates via email' },
              { label: 'Application Updates', description: 'Get notified when application status changes' },
              { label: 'New Messages', description: 'Receive alerts for new messages' },
              { label: 'Job Recommendations', description: 'Get personalized job suggestions' },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={index < 3} />
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Protect your account</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Privacy</h3>
              <p className="text-sm text-muted-foreground">Control your profile visibility</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Public Profile', description: 'Make your profile visible to employers' },
              { label: 'Show Email', description: 'Display your email on your profile' },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={index === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl bg-destructive/5 p-6 border border-destructive/20">
          <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
