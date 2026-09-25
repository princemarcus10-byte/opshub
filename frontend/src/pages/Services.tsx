type Service = {
  name: string
  team: string
  status: 'Operational' | 'Degraded' | 'Down'
  uptime: string
  latency: string
}

const services: Service[] = [
  {
    name: 'API Gateway',
    team: 'Platform',
    status: 'Operational',
    uptime: '99.99%',
    latency: '42 ms',
  },
  {
    name: 'Authentication',
    team: 'Platform',
    status: 'Operational',
    uptime: '99.98%',
    latency: '68 ms',
  },
  {
    name: 'Payments API',
    team: 'Payments',
    status: 'Operational',
    uptime: '99.97%',
    latency: '91 ms',
  },
  {
    name: 'Notification Worker',
    team: 'Messaging',
    status: 'Degraded',
    uptime: '99.82%',
    latency: '184 ms',
  },
  {
    name: 'Web Application',
    team: 'Frontend',
    status: 'Operational',
    uptime: '99.99%',
    latency: '35 ms',
  },
  {
    name: 'PostgreSQL',
    team: 'Data',
    status: 'Operational',
    uptime: '100%',
    latency: '12 ms',
  },
]

function Services() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <p className="mt-1 text-sm text-slate-400">
          Monitor the health and performance of your production services.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Service Inventory</h3>
              <p className="mt-1 text-xs text-slate-500">
                {services.length} registered services
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Add Service
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {services.map((service) => (
            <div
              key={service.name}
              className="grid gap-4 px-6 py-5 transition hover:bg-slate-800/40 md:grid-cols-[2fr_1fr_1fr_1fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      service.status === 'Operational'
                        ? 'bg-emerald-400'
                        : service.status === 'Degraded'
                          ? 'bg-amber-400'
                          : 'bg-red-400'
                    }`}
                  />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="mt-1 pl-5 text-xs text-slate-500">
                  {service.team} team
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Status</div>
                <div
                  className={`mt-1 text-sm ${
                    service.status === 'Operational'
                      ? 'text-emerald-400'
                      : service.status === 'Degraded'
                        ? 'text-amber-400'
                        : 'text-red-400'
                  }`}
                >
                  {service.status}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Uptime</div>
                <div className="mt-1 text-sm text-slate-200">
                  {service.uptime}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Latency</div>
                <div className="mt-1 text-sm text-slate-200">
                  {service.latency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Services
