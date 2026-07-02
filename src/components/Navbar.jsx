import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiActivity, FiPhoneCall } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// Public links shown to everyone, in addition to role-based links below.
// "Specialties" and "How it works" point at sections on the home page
// (add matching id="specialties" / id="how-it-works" to those sections).
const PUBLIC_LINKS = [
  { to: '/doctors', label: 'Find Doctors' },
  { to: '/#about', label: 'About Us' },
  { to: '/#how-it-works', label: 'How It Works' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  const dashboardLink =
    user?.role === 'doctor' ? '/doctor/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/';

  const linkClass = ({ isActive }) =>
    `hover:text-primary-700 transition-colors ${isActive ? 'text-primary-700' : ''}`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-primary-700 shrink-0">
            <FiActivity className="text-primary-600" size={24} />
            MediCare
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-surface-600">
            <a href="/#about" className="hover:text-primary-700 transition-colors">
              About Us
            </a>

            <a href="/#how-it-works" className="hover:text-primary-700 transition-colors">
              How It Works
            </a>

            <NavLink to="/doctors" className={linkClass}>
              Find Doctors
            </NavLink>

            {user?.role === 'patient' && (
              <>
                <NavLink to="/appointments" className={linkClass}>
                  My Appointments
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  My Profile
                </NavLink>
              </>
            )}
            {user?.role === 'doctor' && (
  <>
    <NavLink to="/doctor/dashboard" className={linkClass}>
      Dashboard
    </NavLink>

    <NavLink to="/doctor/appointments" className={linkClass}>
      Appointments
    </NavLink>
  </>
)}
           {user?.role === 'admin' && (
  <>
    <NavLink to="/admin/dashboard" className={linkClass}>
      Dashboard
    </NavLink>
  </>
)}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+911234567890"
              className="flex items-center gap-1.5 text-sm font-semibold text-surface-500 hover:text-primary-700 transition-colors"
            >
              <FiPhoneCall size={15} />
              Care Team
            </a>

            <span className="h-5 w-px bg-surface-200" />

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={dashboardLink}
                  className="flex items-center gap-2 text-sm font-semibold text-surface-700 hover:text-primary-700"
                >
                  <span className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <FiUser size={16} />
                    )}
                  </span>
                  {user.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-ghost !px-2" title="Logout">
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-ghost">Login</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-surface-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-100 px-4 py-3 space-y-1 bg-white">
          {PUBLIC_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
              {l.label}
            </Link>
          ))}

          {user?.role === 'patient' && (
            <>
              <Link to="/appointments" onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
                My Appointments
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
                My Profile
              </Link>
            </>
          )}
          {user?.role === 'doctor' && (
            <Link to="/doctor/appointments" onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
              Appointments
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/doctors" onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
              Manage
            </Link>
          )}

          <a href="tel:+911234567890" className="flex items-center gap-2 py-2 text-surface-700 font-medium">
            <FiPhoneCall size={16} /> Call Care Team
          </a>

          <div className="pt-2 border-t border-surface-100 mt-2">
            {user ? (
              <>
                <Link to={dashboardLink} onClick={() => setOpen(false)} className="block py-2 text-surface-700 font-medium">
                  My Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-outline w-full mt-1">Logout</button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 justify-center">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}