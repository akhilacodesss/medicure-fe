import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorImg from '../../assets/avatar.png';
import {
  FiSearch,
  FiHeart,
  FiActivity,
  FiEye,
  FiUserPlus,
  FiShield,
  FiClock,
  FiLock,
  FiCalendar,
  FiCheckCircle,
  FiPhoneCall,
  FiStar,
  FiChevronRight,
  FiThumbsUp,
  FiHeadphones,
  FiTarget,
  FiUsers,
  FiCompass,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api';
import DoctorCard from '../../components/DoctorCard';
import Loader from '../../components/Loader';

const CATEGORIES = [
  { name: 'Cardiologist', icon: <FiHeart /> },
  { name: 'Dermatologist', icon: <FiActivity /> },
  { name: 'Neurologist', icon: <FiEye /> },
  { name: 'Pediatrician', icon: <FiUserPlus /> },
];

const STATS = [
  { label: 'Verified doctors', value: '1,200+' },
  { label: 'Happy patients', value: '10,000+' },
  { label: 'Appointments booked', value: '45,000+' },
  { label: 'Average rating', value: '4.8/5' },
];

const PILLARS = [
  {
    icon: <FiTarget />,
    title: 'Our mission',
    text: 'Make it as easy to see a good doctor as it is to book a table for dinner.',
  },
  {
    icon: <FiUsers />,
    title: 'Who we serve',
    text: 'Patients who\u2019d rather spend five minutes booking than fifteen on hold.',
  },
  {
    icon: <FiCompass />,
    title: 'How we work',
    text: 'We vet every doctor on our platform before a patient ever sees their profile.',
  },
];

const STEPS = [
  {
    icon: <FiSearch />,
    title: 'Search',
    text: 'Tell us the specialty, symptom, or doctor you\u2019re looking for.',
  },
  {
    icon: <FiCalendar />,
    title: 'Choose a slot',
    text: 'Compare availability and pick a time that works for you.',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Get confirmed',
    text: 'Receive instant confirmation and reminders before your visit.',
  },
];

const FEATURES = [
  {
    icon: <FiShield />,
    title: 'Verified doctors',
    text: 'Every profile is checked for license and credentials before it goes live.',
  },
  {
    icon: <FiClock />,
    title: 'Instant booking',
    text: 'No back-and-forth calls. See real-time availability and book in seconds.',
  },
  {
    icon: <FiLock />,
    title: 'Private by default',
    text: 'Your health records and messages stay encrypted and visible only to you.',
  },
  {
    icon: <FiHeadphones />,
    title: '24/7 support',
    text: 'Our care team is a message away, day or night, for any booking issue.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ananya R.',
    role: 'Booked a dermatologist',
    quote:
      'I found a specialist and booked a same-day slot in under two minutes. No phone calls, no waiting rooms.',
  },
  {
    name: 'Vikram S.',
    role: 'Booked a cardiologist',
    quote:
      'The verified badge actually means something here \u2014 I could see my doctor\u2019s credentials before I booked.',
  },
  {
    name: 'Priya M.',
    role: 'Booked a pediatrician',
    quote:
      'Reminders and instant confirmation made it easy to plan around my kid\u2019s school schedule.',
  },
];

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/doctors', {
          params: { limit: 8, sortBy: 'rating' },
        });
        setDoctors(data.doctors);
      } catch (err) {
        toast.error('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#f7fbfb] to-[#eef7f7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FiShield />
                Your Health, Our Priority
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-surface-900 leading-tight mb-6">
                Find & Book the <br />
                Best Doctors
              </h1>

              <p className="text-lg text-surface-500 max-w-lg mb-8">
                Search from trusted specialists near you and book
                appointments in seconds.
              </p>

              <form
                onSubmit={handleSearch}
                className="bg-white p-2 rounded-2xl shadow-xl flex items-center max-w-xl"
              >
                <FiSearch className="ml-4 text-surface-400" size={20} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctors, hospitals, specialties..."
                  className="flex-1 px-4 py-4 outline-none text-surface-800"
                />

                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-8 mt-8 text-sm font-medium text-surface-600">
                <div className="flex items-center gap-2">
                  <FiShield className="text-primary-600" />
                  Verified Doctors
                </div>

                <div className="flex items-center gap-2">
                  <FiClock className="text-primary-600" />
                  Instant Booking
                </div>

                <div className="flex items-center gap-2">
                  <FiLock className="text-primary-600" />
                  Secure & Private
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative flex justify-center">
              <div className="absolute w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60" />


              {/* Live availability chip */}
              <div className="absolute top-10 right-0 bg-white rounded-2xl shadow-lg px-4 py-3 z-10 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <p className="text-xs font-semibold text-surface-700">120+ doctors online now</p>
              </div>

              {/* Doctor Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary-100 rounded-[50px] rotate-6" />

                <img
                  src={doctorImg}
                  alt="doctor"
                  className="relative max-w-full h-[500px] object-cover rounded-[50px] shadow-2xl"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs sm:text-sm text-primary-100 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FiHeart />
              About MediCare
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 leading-tight mb-5">
              Healthcare shouldn't feel like a waiting room
            </h2>

            <p className="text-surface-500 mb-4 leading-relaxed">
              MediCare started with a simple frustration: booking a doctor took more effort
              than it should \u2014 phone trees, hold music, and appointments that never quite
              matched what you needed. So we built a platform where you can see real
              availability, compare verified specialists, and book in the time it takes to
              read this sentence.
            </p>

            <p className="text-surface-500 mb-8 leading-relaxed">
              Today we work with over a thousand verified doctors across specialties, and
              every one of them is vetted for license and credentials before their profile
              ever goes live.
            </p>

            <Link to="/doctors" className="btn-primary inline-flex w-fit">
              Meet our doctors
            </Link>
          </div>

          <div className="grid gap-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="card p-6 flex gap-4 items-start hover:-translate-y-2 hover:shadow-cardHover transition-all duration-300">
                <span className="h-11 w-11 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-xl">
                  {p.icon}
                </span>
                <div>
                  <h3 className="font-bold text-surface-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR SPECIALTIES */}
      <section id="specialties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-xl font-bold text-surface-900 mb-4">Popular Specialties</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to={`/doctors?specialization=${encodeURIComponent(c.name)}`}
              className="card p-5 flex flex-col items-center gap-2 hover:shadow-cardHover hover:-translate-y-1 transition-all text-primary-600"
            >
              <span className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                {c.icon}
              </span>
              <span className="text-sm font-semibold text-surface-800">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#f7fbfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mb-3">
              Booking a doctor takes three steps
            </h2>
            <p className="text-surface-500">
              From search to confirmed appointment, without the hold music.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative card p-6 flex flex-col items-center text-center gap-3">
                <span className="absolute -top-4 -left-2 text-5xl font-extrabold text-primary-100 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-xl">
                  {step.icon}
                </span>
                <h3 className="font-bold text-surface-900">{step.title}</h3>
                <p className="text-sm text-surface-500">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP RATED DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-surface-900">Top Rated Doctors</h2>
          <Link to="/doctors" className="text-primary-600 text-sm font-semibold flex items-center gap-1">
            View all <FiChevronRight />
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : doctors.length === 0 ? (
          <p className="text-center text-surface-500">No doctors available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {doctors.map((d) => (
              <DoctorCard key={d._id} doctor={d} />
            ))}
          </div>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why patients choose us</h2>
            <FiThumbsUp className="text-primary-400 text-3xl hidden sm:block" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="h-11 w-11 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl mb-4">
                  {f.icon}
                </span>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-surface-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xl font-bold text-surface-900 mb-8 text-center">What patients are saying</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-6 flex flex-col gap-4">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-surface-600 leading-relaxed">{t.quote}</p>
              <div>
                <p className="font-semibold text-surface-900 text-sm">{t.name}</p>
                <p className="text-xs text-surface-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7fbfb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-surface-900 mb-3">
              Frequently Asked Questions
            </h2>

            <p className="text-surface-500">
              Everything you need to know about booking appointments.
            </p>
          </div>

          <div className="space-y-4">
            <details className="card p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between">
                How do I book an appointment?
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>

              <p className="mt-3 text-surface-500">
                Search for a doctor, choose an available slot and confirm your booking instantly.
              </p>
            </details>

            <details className="card p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between">
                Can I cancel or reschedule appointments?
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>

              <p className="mt-3 text-surface-500">
                Yes. You can cancel or reschedule appointments from the My Appointments page.
              </p>
            </details>

            <details className="card p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between">
                Are doctors verified?
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>

              <p className="mt-3 text-surface-500">
                Yes. Every doctor is reviewed and verified before appearing on MediCare.
              </p>
            </details>

            <details className="card p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between">
                Is my medical information secure?
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>

              <p className="mt-3 text-surface-500">
                Absolutely. Your health information is encrypted and securely stored.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12 sm:px-14 sm:py-16 text-center">
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-white/10 rounded-full" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Not sure who to book? Talk to us first.
            </h2>
            <p className="text-primary-100 max-w-xl mx-auto mb-8">
              Our care team can match you with the right specialist based on your symptoms, in under five minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/doctors"
                className="bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition"
              >
                Browse doctors
              </Link>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                <FiPhoneCall />
                Call our care team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}