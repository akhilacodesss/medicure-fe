import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';

export default function DoctorSlots() {
  const { user, refreshUser } = useAuth();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [holidayMode, setHolidayMode] = useState(false);

useEffect(() => {
  const load = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(
        `/doctors/${user.doctorInfo._id}`
      );

      setSlots(data.availability);
      setHolidayMode(data.isHolidayMode);
    } catch (err) {
      toast.error('Failed to load slots');
    } finally {
      setLoading(false);
    }
  };

  if (user?.doctorInfo?._id) {
    load();
  }
}, [user]);

  const addSlot = async () => {
    if (!date || !time) return toast.error('Select date and time');
    try {
      const { data } = await api.post('/doctors/slot', { date, time });
      setSlots(data);
      setDate('');
      setTime('');
      toast.success('Slot added');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add slot');
    }
  };

  const deleteSlot = async (slotId) => {
    try {
      const { data } = await api.delete(`/doctors/slot/${slotId}`);
      setSlots(data);
      toast.success('Slot removed');
    } catch (err) {
      toast.error('Failed to remove slot');
    }
  };

  const toggleHoliday = async () => {
    try {
      await api.put('/doctors/profile', { isHolidayMode: !holidayMode });
      setHolidayMode(!holidayMode);
      await refreshUser();
      toast.success(!holidayMode ? 'Holiday mode enabled' : 'Holiday mode disabled');
    } catch {
      toast.error('Failed to update');
    }
  };

  if (loading) return <Loader />;

  const grouped = slots.reduce((acc, s) => {
    acc[s.date] = acc[s.date] || [];
    acc[s.date].push(s);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-surface-900">Manage Schedule</h1>
        <button onClick={toggleHoliday} className={holidayMode ? 'btn-danger' : 'btn-outline'}>
          {holidayMode ? 'Holiday Mode: ON' : 'Enable Holiday Mode'}
        </button>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="font-bold text-surface-900 mb-4">Add New Slot</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          <input type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={addSlot} className="btn-primary shrink-0"><FiPlus /> Add Slot</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-surface-900 mb-4">Your Available Slots</h3>
        {Object.keys(grouped).length === 0 ? (
          <p className="text-surface-500 text-sm py-6 text-center">No slots created yet.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).sort().map(([d, times]) => (
              <div key={d}>
                <p className="text-sm font-semibold text-surface-700 mb-2">{d}</p>
                <div className="flex flex-wrap gap-2">
                  {times.map((s) => (
                    <span key={s._id} className={`badge flex items-center gap-2 ${s.isBooked ? 'bg-danger-50 text-danger-700' : 'bg-surface-100 text-surface-700'}`}>
                      {s.time} {s.isBooked && '(Booked)'}
                      {!s.isBooked && (
                        <button onClick={() => deleteSlot(s._id)}><FiTrash2 size={12} /></button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
