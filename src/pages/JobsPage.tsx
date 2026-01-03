import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/cards/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { mockJobs } from '@/data/mockData';
import { Job, JobType } from '@/types';

const jobTypes: JobType[] = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA'];
const skills = ['React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Figma', 'UI/UX'];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleJobType = (type: JobType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLocation('');
    setSelectedSkills([]);
    setSearchQuery('');
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => job.skills.includes(skill));

    return matchesSearch && matchesType && matchesLocation && matchesSkills;
  });

  const hasActiveFilters = selectedTypes.length > 0 || selectedLocation || selectedSkills.length > 0;

  return (
    <DashboardLayout 
      title="Browse Jobs"
      subtitle={`${filteredJobs.length} jobs found`}
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs by title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="relative w-64">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex h-12 w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Filters</h3>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Job Types */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Job Type</p>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleJobType(type)}
                  >
                    {type.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onSave={() => toggleSaveJob(job.id)}
                onApply={() => {}}
                showApplicants
              />
            ))
          ) : (
            <div className="text-center py-12 rounded-xl bg-card border border-border/50">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
