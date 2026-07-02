import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AppointmentCard from '../../components/AppointmentCard';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Upcoming');
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [doctorSlots, setDoctorSlots] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = appointments.filter((a) => {
    if (tab === 'Upcoming') return ['Pending', 'Confirmed'].includes(a.status);
    return a.status === tab;
  });

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  const openReschedule = async (appointment) => {
    setRescheduleTarget(appointment);
    setNewDate('');
    setNewTime('');
    try {
      const { data } = await api.get(`/doctors/${appointment.doctorId._id}`);
      setDoctorSlots(data.availability.filter((s) => !s.isBooked));
    } catch (err) {
      toast.error('Failed to load available slots');
    }
  };

  const confirmReschedule = async () => {
    if (!newDate || !newTime) return toast.error('Select a new date and time');
    try {
      await api.put(`/appointments/${rescheduleTarget._id}`, { date: newDate, time: newTime });
      toast.success('Appointment rescheduled');
      setNewDate('');
      setNewTime('');
      setDoctorSlots(null);
      setRescheduleTarget(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reschedule');
    }
  };

  const dates = doctorSlots ? [...new Set(doctorSlots.map((s) => s.date))].sort() : [];
  const timesForDate = doctorSlots ? doctorSlots.filter((s) => s.date === newDate) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">My Appointments</h1>

      <div className="flex gap-2 mb-6 border-b border-surface-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${tab === t ? 'border-primary-600 text-primary-700' : 'border-transparent text-surface-500'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-surface-500">No {tab.toLowerCase()} appointments.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <AppointmentCard
              key={a._id}
              appointment={a}
              onAction={(appt) =>
                ['Pending', 'Confirmed'].includes(appt.status) ? (
                  <>
                    <button onClick={() => openReschedule(appt)} className="btn-outline !py-1.5 !px-3 text-xs">Reschedule</button>
                    <button onClick={() => handleCancel(appt._id)} className="btn-danger !py-1.5 !px-3 text-xs">Cancel</button>
                  </>
                ) : null
              }
            />
          ))}
        </div>
      )}

      <Modal open={!!rescheduleTarget} onClose={() => setRescheduleTarget(null)} title="Reschedule Appointment">
        <div className="space-y-4">
          <div>
            <label className="label">Select New Date</label>
            <div className="flex flex-wrap gap-2">
              {dates.map((d) => (
                <button key={d} onClick={() => { setNewDate(d); setNewTime(''); }} className={`btn-outline !py-1.5 !px-3 text-xs ${newDate === d ? '!bg-primary-50 !border-primary-300 !text-primary-700' : ''}`}>
                  {d}
                </button>
              ))}
              {dates.length === 0 && <p className="text-sm text-surface-500">No other slots available.</p>}
            </div>
          </div>
          {newDate && (
            <div>
              <label className="label">Select New Time</label>
              <div className="flex flex-wrap gap-2">
                {timesForDate.map((s) => (
                  <button key={s._id} onClick={() => setNewTime(s.time)} className={`btn-outline !py-1.5 !px-3 text-xs ${newTime === s.time ? '!bg-primary-50 !border-primary-300 !text-primary-700' : ''}`}>
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button onClick={confirmReschedule} className="btn-primary w-full justify-center">Confirm Reschedule</button>
        </div>
      </Modal>
    </div>
  );
}
