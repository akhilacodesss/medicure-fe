import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiUserCheck, FiUsers, FiCalendar, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const COLORS = { Pending: '#f59e0b', Confirmed: '#237fe0', Completed: '#16a34a', Cancelled: '#dc2626' };

const StatCard = ({ icon, label, value, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <span className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</span>
    <div>
      <p className="text-2xl font-extrabold text-surface-900">{value}</p>
      <p className="text-sm text-surface-500">{label}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

  if (loading) return <Loader />;

  const pieData = stats.statusDistribution.map((s) => ({ name: s._id, value: s.count }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FiUserCheck className="text-primary-600" />} label="Total Doctors" value={stats.totalDoctors} color="bg-primary-50" />
        <StatCard icon={<FiUsers className="text-secondary-600" />} label="Total Patients" value={stats.totalPatients} color="bg-secondary-50" />
        <StatCard icon={<FiCalendar className="text-warning-600" />} label="Today's Appointments" value={stats.todaysAppointments} color="bg-warning-50" />
        <StatCard icon={<FiDollarSign className="text-success-600" />} label="Total Revenue" value={`₹${stats.revenue}`} color="bg-success-50" />
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-surface-900 mb-4">Appointment Status Distribution</h3>
        {pieData.length === 0 ? (
          <p className="text-surface-500 text-sm text-center py-10">No appointment data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
