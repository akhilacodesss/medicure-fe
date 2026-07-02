import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiMapPin,
  FiMail,
  FiPhoneCall,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiHeart,
} from 'react-icons/fi';

const EXPLORE_LINKS = [
  { to: '/doctors', label: 'Find Doctors' },
  { to: '/#specialties', label: 'Specialties' },
  { to: '/#how-it-works', label: 'How It Works' },
];

const PATIENT_LINKS = [
  { to: '/register', label: 'Create Account' },
  { to: '/appointments', label: 'My Appointments' },
  { to: '/profile', label: 'My Profile' },
];

const SPECIALTY_LINKS = [
  { to: '/doctors?specialization=Cardiologist', label: 'Cardiologist' },
  { to: '/doctors?specialization=Dermatologist', label: 'Dermatologist' },
  { to: '/doctors?specialization=Neurologist', label: 'Neurologist' },
  { to: '/doctors?specialization=Pediatrician', label: 'Pediatrician' },
];

const SOCIALS = [
  { icon: <FiFacebook size={16} />, label: 'Facebook', href: '#' },
  { icon: <FiTwitter size={16} />, label: 'Twitter', href: '#' },
  { icon: <FiInstagram size={16} />, label: 'Instagram', href: '#' },
  { icon: <FiLinkedin size={16} />, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
              <FiActivity className="text-primary-400" size={24} />
              MediCare
            </Link>
            <p className="text-sm text-surface-400 max-w-sm mb-6">
              Book trusted, verified doctors in seconds. Real-time availability,
              instant confirmation, and your data kept private, always.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-primary-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Top Specialties</p>
            <ul className="space-y-2.5 text-sm">
              {SPECIALTY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-primary-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-surface-900 mb-3">
              Quick Links
            </h4>

            <ul className="space-y-2">
              {PATIENT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-surface-500 hover:text-primary-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Get In Touch</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-primary-400 mt-0.5 shrink-0" size={15} />
                <span>Hitech City, Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhoneCall className="text-primary-400 shrink-0" size={15} />
                <a href="tel:+911234567890" className="hover:text-primary-400 transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-primary-400 shrink-0" size={15} />
                <a href="mailto:care@medicare.com" className="hover:text-primary-400 transition-colors">
                  care@medicare.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-500">
          <p>© {new Date().getFullYear()} MediCare. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <FiHeart className="text-primary-400" size={12} /> for better healthcare access.
          </p>
        </div>
      </div>
    </footer>
  );
}