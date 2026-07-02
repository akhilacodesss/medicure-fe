import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiCheckCircle, FiDollarSign, FiStar } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const StatCard = ({ icon, label, value, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <span className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</span>
    <div>
      <p className="text-2xl font-extrabold text-surface-900">{value}</p>
      <p className="text-sm text-surface-500">{label}</p>
    </div>
  </div>
);

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: statsData }, { data: appts }] = await Promise.all([
          api.get('/doctors/dashboard'),
          api.get('/doctors/appointments'),
        ]);
        setStats(statsData);
        const today = new Date().toISOString().split('T')[0];
        setTodayAppointments(appts.filter((a) => a.date === today));
      } catch (err) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-1">Welcome back, Dr. {user?.name?.split(' ')[0]}</h1>
      <p className="text-surface-500 mb-6">Here's what's happening with your practice today.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FiCalendar className="text-primary-600" />} label="Today's Appointments" value={stats.todaysAppointments} color="bg-primary-50" />
        <StatCard icon={<FiClock className="text-secondary-600" />} label="Upcoming" value={stats.upcoming} color="bg-secondary-50" />
        <StatCard icon={<FiCheckCircle className="text-success-600" />} label="Completed" value={stats.completed} color="bg-success-50" />
        <StatCard icon={<FiDollarSign className="text-warning-600" />} label="Revenue" value={`₹${stats.revenue}`} color="bg-warning-50" />
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-surface-900">Today's Appointments</h3>
          <span className="flex items-center gap-1 text-sm font-semibold text-surface-700">
            <FiStar className="text-rating fill-rating" /> {stats.rating > 0 ? stats.rating.toFixed(1) : 'New'}
          </span>
        </div>
        {todayAppointments.length === 0 ? (
          <p className="text-surface-500 text-sm py-6 text-center">No appointments scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((a) => (
              <div key={a._id} className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  <p className="font-semibold text-surface-900">{a.patientId?.name}</p>
                  <p className="text-xs text-surface-500">{a.time} · {a.reason || 'General checkup'}</p>
                </div>
                <span className="badge bg-primary-50 text-primary-700">{a.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
