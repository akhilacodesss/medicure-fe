import StatusBadge from './StatusBadge';
import { FiCalendar, FiClock } from 'react-icons/fi';

export default function AppointmentCard({ appointment, isDoctorView, onAction }) {
  const doctor = appointment.doctorId;
  const patient = appointment.patientId;
  const person = isDoctorView ? patient : doctor?.userId;

  return (
    <div className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <img
        src={person?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(person?.name || 'User')}&background=237fe0&color=fff`}
        alt={person?.name}
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-surface-900">
          {isDoctorView ? person?.name : `Dr. ${person?.name}`}
        </h4>
        {!isDoctorView && <p className="text-sm text-primary-600">{doctor?.specialization}</p>}
        <div className="flex items-center gap-4 mt-1 text-xs text-surface-500">
          <span className="flex items-center gap-1"><FiCalendar size={13} /> {appointment.date}</span>
          <span className="flex items-center gap-1"><FiClock size={13} /> {appointment.time}</span>
        </div>
        {appointment.reason && <p className="text-xs text-surface-500 mt-1 truncate">Reason: {appointment.reason}</p>}
      </div>
      <div className="flex flex-col items-start sm:items-end gap-2">
        <StatusBadge status={appointment.status} />
        {onAction && <div className="flex gap-2">{onAction(appointment)}</div>}
      </div>
    </div>
  );
}
