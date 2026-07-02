import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSlash, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/patients');
      setPatients(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleBlock = async (id, isBlocked) => {
    try {
      await api.put(`/admin/patients/${id}/block`, { isBlocked: !isBlocked });
      toast.success(!isBlocked ? 'Patient blocked' : 'Patient unblocked');
      load();
    } catch {
      toast.error('Failed to update');
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm('Permanently delete this patient account?')) return;
    try {
      await api.delete(`/admin/patients/${id}`);
      toast.success('Patient removed');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">Manage Patients</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-50 text-surface-500 text-left">
            <tr>
              <th className="p-4 font-semibold">Patient</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {patients.map((p) => (
              <tr key={p._id}>
                <td className="p-4">
                  <p className="font-semibold text-surface-900">{p.userId?.name}</p>
                  <p className="text-xs text-surface-500">{p.userId?.email}</p>
                </td>
                <td className="p-4 text-surface-600">{p.userId?.phone || '—'}</td>
                <td className="p-4">
                  <span className={`badge ${p.userId?.isBlocked ? 'bg-danger-50 text-danger-700' : 'bg-success-50 text-success-700'}`}>
                    {p.userId?.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => toggleBlock(p._id, p.userId?.isBlocked)} className="btn-outline !py-1.5 !px-3 text-xs">
                      {p.userId?.isBlocked ? <><FiCheckCircle className="inline mr-1" />Unblock</> : <><FiSlash className="inline mr-1" />Block</>}
                    </button>
                    <button onClick={() => deletePatient(p._id)} className="btn-ghost !p-2 text-danger-600"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {patients.length === 0 && <p className="text-center text-surface-500 py-10">No patients registered yet.</p>}
      </div>
    </div>
  );
}
