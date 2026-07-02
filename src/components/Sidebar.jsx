import { NavLink } from 'react-router-dom';

export default function Sidebar({ links, title }) {
  return (
    <aside className="w-full md:w-60 shrink-0">
      <div className="card p-3 sticky top-20">
        {title && <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-surface-400">{title}</p>}
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50'
                }`
              }
            >
              {l.icon} {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
