import { Outlet } from 'react-router-dom';
import { FiGrid, FiUserCheck, FiUsers, FiCalendar } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid size={18} />, end: true },
  { to: '/admin/doctors', label: 'Manage Doctors', icon: <FiUserCheck size={18} /> },
  { to: '/admin/patients', label: 'Manage Patients', icon: <FiUsers size={18} /> },
  { to: '/admin/appointments', label: 'Manage Appointments', icon: <FiCalendar size={18} /> },
];

export default function AdminLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar links={links} title="Admin Panel" />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
