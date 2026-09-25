import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Operations Overview',
  '/services': 'Services',
  '/incidents': 'Incidents',
  '/deployments': 'Deployments',
  '/audit-log': 'Audit Log',
}

function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'Operations Overview'

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="text-sm text-slate-400">
            Monitor and manage your production environment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-200">Production</p>
            <p className="text-xs text-emerald-400">All systems operational</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200">
            MP
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
