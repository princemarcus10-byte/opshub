import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Incidents', to: '/incidents' },
  { label: 'Deployments', to: '/deployments' },
  { label: 'Audit Log', to: '/audit-log' },
]

function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-900/80 md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <div className="text-lg font-semibold tracking-tight">OpsHub</div>
          <div className="text-xs text-slate-500">Operations Platform</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
          <div className="text-xs text-slate-500">Environment</div>
          <div className="mt-1 flex items-center gap-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Production
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
