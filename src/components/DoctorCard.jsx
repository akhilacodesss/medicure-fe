import { Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiClock } from 'react-icons/fi';

export default function DoctorCard({ doctor }) {
  const user = doctor.userId || {};
  return (
    <div className="card p-5 flex flex-col hover:shadow-cardHover transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Doctor')}&background=1f7f7a&color=fff`}
          alt={user.name}
          className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-surface-900 truncate">Dr. {user.name}</h3>
          <p className="text-sm text-primary-600 font-medium truncate">{doctor.specialization}</p>
          <p className="text-xs text-surface-500 truncate">{doctor.qualification}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-surface-500">
        <span className="flex items-center gap-1"><FiClock size={14} /> {doctor.experience}+ yrs</span>
        {doctor.hospital && <span className="flex items-center gap-1 truncate"><FiMapPin size={14} /> {doctor.hospital}</span>}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
        <div className="flex items-center gap-1 text-sm">
          <FiStar className="text-rating fill-rating" size={16} />
          <span className="font-semibold">
  {doctor.rating > 0 ? doctor.rating.toFixed(1) : 'New'}
</span>
          {doctor.numReviews > 0 && <span className="text-surface-400">({doctor.numReviews})</span>}
        </div>
        <span className="font-bold text-surface-900">₹{doctor.fee}</span>
      </div>

      <Link to={`/doctors/${doctor._id}`} className="btn-primary w-full justify-center mt-4">
        View Profile
      </Link>
    </div>
  );
}
