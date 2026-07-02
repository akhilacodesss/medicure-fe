import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import Loader from '../../components/Loader';
import StatusBadge from '../../components/StatusBadge';

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/appointments');
      setAppointments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const cancelAppointment = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.put(`/admin/appointments/${id}`, { status: 'Cancelled' });
      toast.success('Appointment cancelled');
      load();
    } catch {
      toast.error('Failed to cancel');
    }
  };

  const filtered = statusFilter ? appointments.filter((a) => a.status === statusFilter) : appointments;

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-surface-900">Manage Appointments</h1>
        <select className="input !w-48" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-50 text-surface-500 text-left">
            <tr>
              <th className="p-4 font-semibold">Patient</th>
              <th className="p-4 font-semibold">Doctor</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Time</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {filtered.map((a) => (
              <tr key={a._id}>
                <td className="p-4 font-medium text-surface-900">{a.patientId?.name}</td>
                <td className="p-4 text-surface-600">Dr. {a.doctorId?.userId?.name}</td>
                <td className="p-4 text-surface-600">{a.date}</td>
                <td className="p-4 text-surface-600">{a.time}</td>
                <td className="p-4"><StatusBadge status={a.status} /></td>
                <td className="p-4 text-right">
                  {!['Cancelled', 'Completed'].includes(a.status) && (
                    <button onClick={() => cancelAppointment(a._id)} className="btn-danger !py-1.5 !px-3 text-xs">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-surface-500 py-10">No appointments found.</p>}
      </div>
    </div>
  );
}
