import { useEffect, useState } from 'react'

import { fetchServices, type Service } from '../api'

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setError('Unable to load services'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Services</h2>
          <p className="mt-1 text-sm text-slate-400">
            Monitor the health and performance of production services.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          Add Service
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {loading && (
          <div className="p-6 text-sm text-slate-400">
            Loading services...
          </div>
        )}

        {error && (
          <div className="p-6 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
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
