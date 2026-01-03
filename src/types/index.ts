export type UserRole = 'job_seeker' | 'employer' | 'admin';

export type ApplicationStatus = 'applied' | 'review' | 'shortlisted' | 'rejected';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface JobSeeker extends User {
  role: 'job_seeker';
  title?: string;
  location?: string;
  skills: string[];
  experience: number;
  education?: string;
  resumeUrl?: string;
  profileCompletion: number;
}

export interface Employer extends User {
  role: 'employer';
  companyName: string;
  companyLogo?: string;
  industry?: string;
  companySize?: string;
  location?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  salary?: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: Date;
  applicantsCount: number;
  status: 'open' | 'closed';
  employerId: string;
}

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  applicantId: string;
  applicant?: JobSeeker;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalUsers?: number;
  activeJobs?: number;
  totalApplications?: number;
  newUsersThisMonth?: number;
}
