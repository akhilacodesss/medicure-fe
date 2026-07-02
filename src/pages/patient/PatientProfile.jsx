import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function PatientProfile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.patientInfo?.age,
        gender: user.patientInfo?.gender,
        address: user.patientInfo?.address,
        medicalHistory: user.patientInfo?.medicalHistory,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put('/auth/profile', data);
      await refreshUser();
      navigate('/');
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">My Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&size=100&background=1f7f7a&color=fff`}
            className="h-16 w-16 rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <p className="font-bold text-surface-900">{user?.name}</p>
            <p className="text-sm text-surface-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" {...register('name')} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              className="input"
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
            <label className="label">Age</label>
            <input
              className="input"
              type="number"
              {...register('age', {
                min: { value: 0, message: 'Invalid age' },
                max: { value: 120, message: 'Invalid age' },
              })}
            />
            {errors.age && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.age.message}
              </p>
            )}
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
          <label className="label">Address</label>
          <input className="input" {...register('address')} />
        </div>
        <div>
          <label className="label">Medical History (optional)</label>
          <textarea className="input" rows={3} {...register('medicalHistory')} />
        </div>

        <button className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
