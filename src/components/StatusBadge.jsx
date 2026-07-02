const map = {
  Pending: 'badge-pending',
  Confirmed: 'badge-confirmed',
  Completed: 'badge-completed',
  Cancelled: 'badge-cancelled',
};

export default function StatusBadge({ status }) {
  return (
  <span className={map[status] || 'badge bg-surface-100 text-surface-700'}>
    {status || 'Unknown'}
  </span>
);
}
