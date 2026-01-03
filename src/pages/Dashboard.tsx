import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import JobSeekerDashboard from './dashboards/JobSeekerDashboard';
import EmployerDashboard from './dashboards/EmployerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default function Dashboard() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  switch (role) {
    case 'job_seeker':
      return <JobSeekerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}
