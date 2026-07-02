import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function DoctorProfileEdit() {
  const { user, refreshUser } = useAuth();
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();
const navigate = useNavigate();

  useEffect(() => {
    if (user?.doctorInfo) {
      reset({
        ...user.doctorInfo,
        languages: user.doctorInfo.languages?.join(', '),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put('/doctors/profile', {
        ...data,
        languages: data.languages ? data.languages.split(',').map((l) => l.trim()) : [],
      });
      await api.put('/auth/profile', { name: data.name, phone: data.phone });
      await refreshUser();
      reset();
      toast.success('Profile updated successfully');
      navigate('/doctor/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">My Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" defaultValue={user?.name} {...register('name')} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              className="input"
              defaultValue={user?.phone}
              {...register('phone', {
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone number must be 10 digits',
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
            <label className="label">Specialization</label>
            <input className="input" {...register('specialization')} />
          </div>
          <div>
            <label className="label">Qualification</label>
            <input className="input" {...register('qualification')} />
          </div>
          <div>
            <label className="label">Experience (years)</label>
            <input className="input" type="number" {...register('experience')} />
          </div>
          <div>
            <label className="label">Consultation Fee (₹)</label>
            <input className="input" type="number" {...register('fee')} />
          </div>
          <div>
            <label className="label">Hospital / Clinic</label>
            <input className="input" {...register('hospital')} />
          </div>
          <div>
            <label className="label">Gender</label>
            <select className="input" {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Languages (comma separated)</label>
          <input className="input" placeholder="English, Hindi, Telugu" {...register('languages')} />
        </div>

        <div>
          <label className="label">About</label>
          <textarea className="input" rows={4} {...register('about')} placeholder="Tell patients about your experience and approach..." />
        </div>

        <button className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
