import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProfileCompletion } from '@/components/ProfileCompletion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockJobSeeker } from '@/data/mockData';
import { MapPin, Briefcase, GraduationCap, Mail, Phone, Upload, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <DashboardLayout 
      title="My Profile"
      subtitle="Manage your professional profile"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
                  {mockJobSeeker.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{mockJobSeeker.name}</h2>
                  <p className="text-muted-foreground">{mockJobSeeker.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mockJobSeeker.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {mockJobSeeker.experience} years exp.
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {mockJobSeeker.email}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Education</label>
                <div className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {mockJobSeeker.education}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Skills</h3>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockJobSeeker.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Resume</h3>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">Upload your resume</p>
              <p className="text-sm text-muted-foreground mb-4">PDF or DOC, max 5MB</p>
              <Button variant="outline">Choose File</Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProfileCompletion percentage={mockJobSeeker.profileCompletion} />

          {/* Job Preferences */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Job Preferences</h3>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Preferred Role</p>
                <p className="font-medium text-foreground">Full Stack Developer</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium text-foreground">Full-time, Remote</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected Salary</p>
                <p className="font-medium text-foreground">$120,000 - $160,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
