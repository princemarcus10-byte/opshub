type Incident = {
  id: string
  title: string
  service: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved'
  started: string
}

const incidents: Incident[] = [
  {
    id: 'INC-1042',
    title: 'Notification delivery delays',
    service: 'Notification Worker',
    severity: 'Medium',
    status: 'Monitoring',
    started: '18 minutes ago',
  },
  {
    id: 'INC-1041',
    title: 'Elevated API latency',
    service: 'API Gateway',
    severity: 'High',
    status: 'Resolved',
    started: '2 hours ago',
  },
  {
    id: 'INC-1040',
    title: 'Database connection pool exhaustion',
    service: 'PostgreSQL',
    severity: 'Critical',
    status: 'Resolved',
    started: 'Yesterday',
  },
]

function Incidents() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Incidents</h2>
        <p className="mt-1 text-sm text-slate-400">
          Investigate and track production incidents across your services.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Incident History</h3>
              <p className="mt-1 text-xs text-slate-500">
                Recent production incidents
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white"
            >
              Create Incident
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="px-6 py-5 transition hover:bg-slate-800/40"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">
                      {incident.id}
                    </span>

                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                        incident.severity === 'Critical'
                          ? 'border-red-500/30 bg-red-500/10 text-red-400'
                          : incident.severity === 'High'
                            ? 'border-orange-500/30 bg-orange-500/10 text-orange-400'
                            : incident.severity === 'Medium'
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                              : 'border-slate-700 bg-slate-800 text-slate-400'
                      }`}
                    >
                      {incident.severity}
                    </span>

                    <span className="text-xs text-slate-500">
                      {incident.started}
                    </span>
                  </div>

                  <h3 className="mt-2 truncate font-medium text-slate-100">
                    {incident.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Affected service: {incident.service}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-2 text-xs ${
                      incident.status === 'Resolved'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {incident.status}
                  </span>

                  <button
                    type="button"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Incidents
