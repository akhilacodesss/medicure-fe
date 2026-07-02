import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiUserPlus } from 'react-icons/fi';

export default function GetStarted() {
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
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-surface-900 mb-2">Welcome to MediCare</h1>
        <p className="text-surface-500 mb-10">How would you like to continue?</p>

        <div className="space-y-4">
          <Link to="/login" className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition-shadow text-left">
            <span className="h-11 w-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center"><FiUser size={20} /></span>
            <div>
              <p className="font-bold text-surface-900">Login</p>
              <p className="text-sm text-surface-500">Already have an account</p>
            </div>
          </Link>
          <Link to="/register" className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition-shadow text-left">
            <span className="h-11 w-11 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center"><FiUserPlus size={20} /></span>
            <div>
              <p className="font-bold text-surface-900">Create Account</p>
              <p className="text-sm text-surface-500">New patient or doctor</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
