import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import api from '../../services/api';
import DoctorCard from '../../components/DoctorCard';
import Loader from '../../components/Loader';

export default function DoctorListing() {
  const [searchParams, ] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    specialization: searchParams.get('specialization') || '',
    gender: searchParams.get('gender') || '',
    minFee: '',
    maxFee: '',
    minExperience: '',
    sortBy: 'rating',
    page: 1,
  });

  useEffect(() => {
    api.get('/doctors/specializations').then(({ data }) => setSpecializations(data));
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
        const { data } = await api.get('/doctors', { params });
        setDoctors(data.doctors);
        setPages(data.pages);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value, page: 1 }));

  const clearFilters = () =>
    setFilters({ search: '', specialization: '', gender: '', minFee: '', maxFee: '', minExperience: '', sortBy: 'rating', page: 1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-surface-900">Find Doctors</h1>
        <button className="btn-outline md:hidden" onClick={() => setShowFilters(!showFilters)}>
          <FiFilter /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className={`md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="card p-5 space-y-5 sticky top-20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-primary-600 font-semibold">Clear all</button>
            </div>

            <div>
              <label className="label">Search</label>
              <input className="input" value={filters.search} onChange={(e) => update('search', e.target.value)} placeholder="Name or hospital" />
            </div>

            <div>
              <label className="label">Specialization</label>
              <select className="input" value={filters.specialization} onChange={(e) => update('specialization', e.target.value)}>
                <option value="">All</option>
                {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Gender</label>
              <div className="flex gap-2">
                {['', 'male', 'female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => update('gender', g)}
                    className={`btn-outline !py-1.5 !px-3 text-xs capitalize ${filters.gender === g ? '!bg-primary-50 !border-primary-300 !text-primary-700' : ''}`}
                  >
                    {g || 'Any'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Fee Range (₹)</label>
              <div className="flex gap-2">
                <input className="input" type="number" placeholder="Min" value={filters.minFee} onChange={(e) => update('minFee', e.target.value)} />
                <input className="input" type="number" placeholder="Max" value={filters.maxFee} onChange={(e) => update('maxFee', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Min Experience (yrs)</label>
              <input className="input" type="number" value={filters.minExperience} onChange={(e) => update('minExperience', e.target.value)} />
            </div>

            <div>
              <label className="label">Sort By</label>
              <select className="input" value={filters.sortBy} onChange={(e) => update('sortBy', e.target.value)}>
                <option value="rating">Highest Rated</option>
                <option value="fee_low">Lowest Fee</option>
                <option value="fee_high">Highest Fee</option>
                <option value="experience">Most Experienced</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : doctors.length === 0 ? (
            <div className="card p-10 text-center text-surface-500">No doctors found matching your criteria.</div>
          ) : (
            <>
              <p className="text-sm text-surface-500 mb-4">{doctors.length} doctors found</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {doctors.map((d) => <DoctorCard key={d._id} doctor={d} />)}
              </div>
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => update('page', i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold ${filters.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
