import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AppointmentCard from '../../components/AppointmentCard';
import Loader from '../../components/Loader';

const TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');

  const load = async () => {
    setLoading(true);
    try {
  const { data } = await api.get('/doctors/appointments');
  setAppointments(data);
} catch (err) {
  toast.error('Failed to load appointments');
} finally {
  setLoading(false);
}
  };

  useEffect(() => { load(); }, []);

  const filtered = tab === 'All' ? appointments : appointments.filter((a) => a.status === tab);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/doctors/appointments/${id}`, { status });
      toast.success(`Appointment ${status.toLowerCase()}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">Appointment Management</h1>

      <div className="flex gap-2 mb-6 border-b border-surface-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition ${
              tab === t ? 'border-primary-600 text-primary-700' : 'border-transparent text-surface-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-surface-500">No appointments found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <AppointmentCard
              key={a._id}
              appointment={a}
              isDoctorView
              onAction={(appt) => (
                <>
                  {appt.status === 'Pending' && (
                    <>
                      <button onClick={() => updateStatus(appt._id, 'Confirmed')} className="btn-primary !py-1.5 !px-3 text-xs">Accept</button>
                      <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="btn-danger !py-1.5 !px-3 text-xs">Reject</button>
                    </>
                  )}
                  {appt.status === 'Confirmed' && (
                    <>
                      <button onClick={() => updateStatus(appt._id, 'Completed')} className="btn-primary !py-1.5 !px-3 text-xs">Mark Completed</button>
                      <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="btn-danger !py-1.5 !px-3 text-xs">Cancel</button>
                    </>
                  )}
                </>
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
