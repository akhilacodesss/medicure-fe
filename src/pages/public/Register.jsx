import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiActivity,  FiEye, FiEyeOff  } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('patient');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const data = await registerUser({ ...formData, role });
      toast.success('Account created successfully!');
      if (data.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 font-extrabold text-2xl text-primary-700">
            <FiActivity /> MediCare
          </Link>
          <p className="text-surface-500 mt-2">Create your account</p>
        </div>

        <div className="flex rounded-xl bg-surface-100 p-1 mb-5">
          {['patient', 'doctor'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition ${role === r ? 'bg-white shadow-sm text-primary-700' : 'text-surface-500'
                }`}
            >
              {r === 'patient' ? 'I am a Patient' : 'I am a Doctor'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" placeholder="John Doe" {...register('name', { required: true })} />
            {errors.name && <p className="text-danger-600 text-xs mt-1">Name is required</p>}
          </div>
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
            <label className="label">Phone</label>
            <input
              className="input"
              type="tel"
              placeholder="9876543210"
              maxLength={10}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 10);
              }}
              {...register('phone', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
            />

            {errors.phone && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.phone.message}
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

          {role === 'doctor' && (
            <>
              <div>
                <label className="label">Specialization</label>
                <input className="input" placeholder="e.g. Cardiologist" {...register('specialization')} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Experience (yrs)</label>
                  <input className="input" type="number" min="0" {...register('experience')} />
                </div>
                <div>
                  <label className="label">Fee (₹)</label>
                  <input className="input" type="number" min="0" {...register('fee')} />
                </div>
              </div>
              <div>
                <label className="label">Qualification</label>
                <input className="input" placeholder="e.g. MBBS, MD" {...register('qualification')} />
              </div>
            </>
          )}

          <button className="btn-primary w-full justify-center" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
