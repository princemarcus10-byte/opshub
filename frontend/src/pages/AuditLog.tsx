import { useEffect, useState } from 'react'

import { fetchAuditEvents, type AuditEvent } from '../api'

function AuditLog() {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAuditEvents()
      .then(setEvents)
      .catch(() => setError('Unable to load audit events'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Audit Log</h2>
        <p className="mt-1 text-sm text-slate-400">
          Review security, deployment, incident, and service activity.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <div>
            <h3 className="font-semibold">Activity History</h3>
            <p className="mt-1 text-xs text-slate-500">
              Recent platform events
            </p>
          </div>
        </div>

        {loading && (
          <div className="px-6 py-8 text-sm text-slate-400">
            Loading audit events...
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="px-6 py-8 text-sm text-slate-400">
            No audit events recorded.
          </div>
        )}

        {!loading && events.length > 0 && (
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
                          AUD-{String(event.id).padStart(4, '0')}
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default AuditLog
