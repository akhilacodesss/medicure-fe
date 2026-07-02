import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiActivity, FiArrowRight } from 'react-icons/fi';

export default function Splash() {
  const { user } = useAuth();

if (user) {
  if (user.role === 'doctor') {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 flex flex-col items-center justify-center text-white text-center px-6">
      <div className="h-20 w-20 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
        <FiActivity size={40} />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">MediCare</h1>
      <p className="text-primary-100 max-w-md mb-10">
        Book trusted doctors, manage appointments, and take care of your health — all in one place.
      </p>
      <Link to="/get-started" className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-3">
        Get Started <FiArrowRight />
      </Link>
    </div>
  );
}
