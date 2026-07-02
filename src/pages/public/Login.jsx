import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiActivity, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  if (user) {
    if (user.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    }

    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      
       console.log("Logged user:", data);
      toast.success('Welcome back!');
      const redirect =
        location.state?.from ||
        (data.role === 'doctor' ? '/doctor/dashboard' : data.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(redirect, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6 py-12">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-extrabold text-2xl text-primary-700">
            <FiActivity /> MediCare
          </Link>
          <p className="text-surface-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })} />
            {errors.email && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">Password</label>

            <div className="relative">
              <input
                className="input pr-10"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', { required: true })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-danger-600 text-xs mt-1">
                Password is required
              </p>
            )}
          </div>
          <button className="btn-primary w-full justify-center" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Don't have an account? <Link to="/register" className="text-primary-600 font-semibold">Sign up</Link>
        </p>
        <p className="text-center text-xs text-surface-400 mt-2">
          Admin? <Link to="/login" className="underline">Use your admin credentials above</Link>
        </p>
      </div>
    </div>
  );
}
