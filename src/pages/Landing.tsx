import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

const roles = [
  {
    id: 'job_seeker' as UserRole,
    title: 'Job Seeker',
    description: 'Find your dream job and advance your career',
    icon: Users,
    features: ['Search thousands of jobs', 'Track applications', 'Build your profile'],
  },
  {
    id: 'employer' as UserRole,
    title: 'Employer',
    description: 'Find the perfect candidates for your team',
    icon: Building2,
    features: ['Post job openings', 'Review applicants', 'Manage hiring pipeline'],
  },
  {
    id: 'admin' as UserRole,
    title: 'Administrator',
    description: 'Manage platform operations and users',
    icon: Briefcase,
    features: ['User management', 'Content moderation', 'Platform analytics'],
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
                <Briefcase className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">JobPortal</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
              <Button className="bg-primary-foreground text-sidebar hover:bg-primary-foreground/90">
                Get Started
              </Button>
            </div>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
            Find Your Next
            <span className="block text-accent">Career Opportunity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 animate-fade-in">
            Connect talented professionals with leading companies. Whether you're looking for your dream job 
            or the perfect candidate, we've got you covered.
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-slide-up">
            <Button 
              size="xl" 
              className="bg-primary-foreground text-sidebar hover:bg-primary-foreground/90"
              onClick={() => handleRoleSelect('job_seeker')}
            >
              Find Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => handleRoleSelect('employer')}
            >
              Post a Job
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Active Jobs', value: '10,000+' },
              { label: 'Companies', value: '2,500+' },
              { label: 'Job Seekers', value: '50,000+' },
              { label: 'Hired', value: '15,000+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Get Started Today</h2>
          <p className="mt-3 text-muted-foreground">Choose your role to explore the platform</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group rounded-2xl bg-card p-8 shadow-card border border-border/50 card-hover cursor-pointer"
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mb-6 group-hover:scale-110 transition-transform">
                <role.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{role.title}</h3>
              <p className="text-muted-foreground mb-6">{role.description}</p>
              <ul className="space-y-2">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6 group-hover:shadow-glow" variant="hero">
                Continue as {role.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">JobPortal</span>
          </div>
          <p>© 2025 JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
