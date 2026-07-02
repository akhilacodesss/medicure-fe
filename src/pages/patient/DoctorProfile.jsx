import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiStar, FiClock, FiMapPin, FiGlobe, FiCalendar } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

export default function DoctorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
  const loadDoctor = async () => {
    try {
      const { data } = await api.get(`/doctors/${id}`);
      setDoctor(data);
    } catch (err) {
      toast.error('Failed to load doctor profile');
    } finally {
      setLoading(false);
    }
  };

  loadDoctor();
}, [id]);

  if (loading) return <Loader />;
  if (!doctor) return <div className="text-center py-20 text-surface-500">Doctor not found</div>;

  const user_ = doctor.userId || {};
  const availableSlots = doctor.availability.filter((s) => !s.isBooked);
  const dates = [...new Set(availableSlots.map((s) => s.date))].sort();
  const timesForDate = availableSlots.filter((s) => s.date === selectedDate);

  const openBooking = () => {
    if (!user) return navigate('/login', { state: { from: `/doctors/${id}` } });
    if (user.role !== 'patient') return toast.error('Only patients can book appointments');
    setShowBooking(true);
  };

  const confirmBooking = async () => {
    if (!selectedDate || !selectedTime) return toast.error('Please select date and time');
    setBooking(true);
    try {
      await api.post('/appointments', { doctorId: id, date: selectedDate, time: selectedTime, reason });
      toast.success('Appointment booked successfully!');
      setSelectedDate('');
setSelectedTime('');
setReason('');
      setShowBooking(false);
      navigate('/appointments');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={user_.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user_.name || 'Doctor')}&size=200&background=1f7f7a&color=fff`}
            className="h-28 w-28 rounded-2xl object-cover border-2 border-primary-100"
            alt={user_.name}
          />
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-surface-900">Dr. {user_.name}</h1>
            <p className="text-primary-600 font-semibold">{doctor.specialization}</p>
            <p className="text-surface-500 text-sm">{doctor.qualification}</p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-surface-600">
              <span className="flex items-center gap-1.5"><FiClock size={15} /> {doctor.experience}+ years experience</span>
              {doctor.hospital && <span className="flex items-center gap-1.5"><FiMapPin size={15} /> {doctor.hospital}</span>}
              {doctor.languages?.length > 0 && <span className="flex items-center gap-1.5"><FiGlobe size={15} /> {doctor.languages.join(', ')}</span>}
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-1 font-semibold text-surface-800">
                <FiStar className="text-rating fill-rating" /> {doctor.rating > 0 ? doctor.rating.toFixed(1) : 'New'}
                {doctor.numReviews > 0 && <span className="text-surface-400 font-normal">({doctor.numReviews} reviews)</span>}
              </span>
              <span className="text-xl font-extrabold text-surface-900">₹{doctor.fee}</span>
            </div>
          </div>
          <div className="sm:self-start">
            <button onClick={openBooking} className="btn-primary w-full sm:w-auto">
              <FiCalendar /> Book Appointment
            </button>
          </div>
        </div>

        {doctor.about && (
          <div className="mt-6 pt-6 border-t border-surface-100">
            <h3 className="font-bold text-surface-900 mb-2">About</h3>
            <p className="text-surface-600 text-sm leading-relaxed">{doctor.about}</p>
          </div>
        )}
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="font-bold text-surface-900 mb-4">Available Slots</h3>
        {dates.length === 0 ? (
          <p className="text-surface-500 text-sm">No available slots at the moment.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {dates.map((d) => (
              <span key={d} className="badge bg-primary-50 text-primary-700">{d}</span>
            ))}
          </div>
        )}
      </div>

      <Modal open={showBooking} onClose={() => setShowBooking(false)} title="Book Appointment">
        <div className="space-y-4">
          <div>
            <label className="label">Select Date</label>
            <div className="flex flex-wrap gap-2">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => { setSelectedDate(d); setSelectedTime(''); }}
                  className={`btn-outline !py-1.5 !px-3 text-xs ${selectedDate === d ? '!bg-primary-50 !border-primary-300 !text-primary-700' : ''}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div>
              <label className="label">Select Time</label>
              <div className="flex flex-wrap gap-2">
                {timesForDate.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => setSelectedTime(s.time)}
                    className={`btn-outline !py-1.5 !px-3 text-xs ${selectedTime === s.time ? '!bg-primary-50 !border-primary-300 !text-primary-700' : ''}`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="label">Reason for visit (optional)</label>
            <textarea className="input" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Briefly describe your symptoms..." />
          </div>

          <button onClick={confirmBooking} disabled={booking} className="btn-primary w-full justify-center">
            {booking ? 'Booking...' : `Confirm Booking · ₹${doctor.fee}`}
          </button>
        </div>
      </Modal>
    </div>
  );
}
