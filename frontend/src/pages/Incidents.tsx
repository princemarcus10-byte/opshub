import { useEffect, useState } from 'react'

import {
  createIncident,
  fetchIncidents,
  type Incident,
} from '../api'

function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [service, setService] = useState('')
  const [severity, setSeverity] = useState('Medium')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchIncidents()
      .then(setIncidents)
      .catch(() => setError('Unable to load incidents'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreateIncident(event: React.FormEvent) {
    event.preventDefault()

    if (!title.trim() || !service.trim()) {
      return
    }

    setCreating(true)
    setError('')

    try {
      const incident = await createIncident(
        title.trim(),
        service.trim(),
        severity,
      )

      setIncidents((current) => [incident, ...current])
      setTitle('')
      setService('')
      setSeverity('Medium')
      setShowForm(false)
    } catch {
      setError('Unable to create incident')
    } finally {
      setCreating(false)
    }
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Incidents</h2>
          <p className="mt-1 text-sm text-slate-400">
            Track and manage production incidents.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          {showForm ? 'Cancel' : 'Create Incident'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateIncident}
          className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Create Incident
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Incident title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Elevated API latency"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Severity
              </label>
              <select
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Affected service
              </label>
              <input
                value={service}
                onChange={(event) => setService(event.target.value)}
                placeholder="e.g. API Gateway"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Incident'}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {loading && (
          <div className="p-6 text-sm text-slate-400">
            Loading incidents...
          </div>
        )}

        {!loading && incidents.length === 0 && (
          <div className="p-6 text-sm text-slate-400">
            No incidents recorded.
          </div>
        )}

        {!loading && incidents.length > 0 && (
          <div className="divide-y divide-slate-800">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between gap-6 p-5"
              >
                <div className="min-w-0">
                  <h3 className="font-medium text-white">
                    {incident.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {incident.service}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                    {incident.severity}
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {incident.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Incidents
