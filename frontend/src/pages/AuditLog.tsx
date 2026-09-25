type AuditEvent = {
  id: string
  action: string
  resource: string
  actor: string
  timestamp: string
  category: 'Deployment' | 'Incident' | 'Service' | 'Access'
}

const events: AuditEvent[] = [
  {
    id: 'AUD-7821',
    action: 'Deployed',
    resource: 'Web Application v2.14.0',
    actor: 'CI Pipeline',
    timestamp: '12 minutes ago',
    category: 'Deployment',
  },
  {
    id: 'AUD-7820',
    action: 'Updated incident',
    resource: 'INC-1042',
    actor: 'Marcus',
    timestamp: '18 minutes ago',
    category: 'Incident',
  },
  {
    id: 'AUD-7819',
    action: 'Created service',
    resource: 'Notification Worker',
    actor: 'Marcus',
    timestamp: '42 minutes ago',
    category: 'Service',
  },
  {
    id: 'AUD-7818',
    action: 'Successful login',
    resource: 'Production Console',
    actor: 'Marcus',
    timestamp: '1 hour ago',
    category: 'Access',
  },
  {
    id: 'AUD-7817',
    action: 'Deployed',
    resource: 'API Gateway v1.18.3',
    actor: 'CI Pipeline',
    timestamp: '1 hour ago',
    category: 'Deployment',
  },
]

function AuditLog() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Audit Log</h2>
        <p className="mt-1 text-sm text-slate-400">
          Review security, deployment, incident, and service activity.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <div>
            <h3 className="font-semibold">Activity History</h3>
            <p className="mt-1 text-xs text-slate-500">
              Recent platform events
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {events.map((event) => (
            <div
              key={event.id}
              className="px-6 py-5 transition hover:bg-slate-800/40"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400">
                    {event.category === 'Deployment'
                      ? '↗'
                      : event.category === 'Incident'
                        ? '!'
                        : event.category === 'Service'
                          ? '●'
                          : '◆'}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-200">
                        {event.action}
                      </span>

                      <span className="font-mono text-xs text-slate-500">
                        {event.id}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-400">
                      {event.resource}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      by {event.actor}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-slate-500">
                  {event.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default AuditLog
