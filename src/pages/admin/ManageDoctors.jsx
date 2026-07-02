import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/doctors');
      setDoctors(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleApproval = async (id, isApproved) => {
    try {
      await api.put(`/admin/doctors/${id}`, { isApproved: !isApproved });
      toast.success(!isApproved ? 'Doctor approved' : 'Doctor unapproved');
      load();
    } catch {
      toast.error('Failed to update');
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await api.put(`/admin/doctors/${id}`, { isActive: !isActive });
      toast.success(!isActive ? 'Doctor activated' : 'Doctor deactivated');
      load();
    } catch {
      toast.error('Failed to update');
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm('Permanently delete this doctor account?')) return;
    try {
      await api.delete(`/admin/doctors/${id}`);
      toast.success('Doctor removed');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-surface-900 mb-6">Manage Doctors</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-50 text-surface-500 text-left">
            <tr>
              <th className="p-4 font-semibold">Doctor</th>
              <th className="p-4 font-semibold">Specialization</th>
              <th className="p-4 font-semibold">Fee</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {doctors.map((d) => (
              <tr key={d._id}>
                <td className="p-4">
                  <p className="font-semibold text-surface-900">Dr. {d.userId?.name}</p>
                  <p className="text-xs text-surface-500">{d.userId?.email}</p>
                </td>
                <td className="p-4 text-surface-600">{d.specialization || '—'}</td>
                <td className="p-4 text-surface-600">₹{d.fee}</td>
                <td className="p-4">
                  <span className={`badge ${d.isApproved ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700'}`}>
                    {d.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  {' '}
                  <span className={`badge ${d.userId?.isActive ? 'bg-secondary-50 text-secondary-700' : 'bg-danger-50 text-danger-700'}`}>
                    {d.userId?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => toggleApproval(d._id, d.isApproved)} className="btn-ghost !p-2" title="Toggle approval">
                      {d.isApproved ? <FiXCircle className="text-warning-600" /> : <FiCheckCircle className="text-success-600" />}
                    </button>
                    <button onClick={() => toggleActive(d._id, d.userId?.isActive)} className="btn-outline !py-1.5 !px-3 text-xs">
                      {d.userId?.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => deleteDoctor(d._id)} className="btn-ghost !p-2 text-danger-600"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {doctors.length === 0 && <p className="text-center text-surface-500 py-10">No doctors registered yet.</p>}
      </div>
    </div>
  );
}
