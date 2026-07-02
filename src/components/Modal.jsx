import { FiX } from 'react-icons/fi';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} card p-6 max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-surface-900">{title}</h3>
          <button onClick={onClose} className="text-surface-400 hover:text-surface-700">
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
