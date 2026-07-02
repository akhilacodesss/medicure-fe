import { Outlet } from 'react-router-dom';
import { FiGrid, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

const links = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: <FiGrid size={18} />, end: true },
  { to: '/doctor/appointments', label: 'Appointments', icon: <FiCalendar size={18} /> },
  { to: '/doctor/slots', label: 'Schedule', icon: <FiClock size={18} /> },
  { to: '/doctor/profile', label: 'My Profile', icon: <FiUser size={18} /> },
];

export default function DoctorLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar links={links} title="Doctor Panel" />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
