import { useEffect, useState } from 'react'

import { createService, fetchServices, type Service } from '../api'

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setError('Unable to load services'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreateService(event: React.FormEvent) {
    event.preventDefault()

    if (!name.trim() || !team.trim()) {
      return
    }

    setCreating(true)
    setError('')

    try {
      const service = await createService(name.trim(), team.trim())
      setServices((current) => [...current, service])
      setName('')
      setTeam('')
      setShowForm(false)
    } catch {
      setError('Unable to create service')
    } finally {
      setCreating(false)
    }
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Services</h2>
          <p className="mt-1 text-sm text-slate-400">
            Monitor the health and performance of production services.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateService}
          className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="text-lg font-semibold text-white">Create Service</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Service name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Payments API"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Team
              </label>
              <input
                value={team}
                onChange={(event) => setTeam(event.target.value)}
                placeholder="e.g. Payments"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Service'}
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
            Loading services...
          </div>
        )}

        {!loading && (
          <div className="divide-y divide-slate-800">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <h3 className="font-medium text-white">{service.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {service.team}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Services
