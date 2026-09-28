import { useEffect, useState } from 'react'

import { fetchDashboardSummary, type DashboardSummary } from '../api'
import MetricCard from '../components/MetricCard'

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardSummary()
      .then(setSummary)
      .catch(() => setError('Unable to load dashboard summary'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">
          System Overview
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Real-time platform health and operational status.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Services"
          value={loading ? '—' : String(summary?.services ?? 0)}
          detail="Registered services"
        />

        <MetricCard
          label="Active Incidents"
          value={loading ? '—' : String(summary?.active_incidents ?? 0)}
          detail={
            loading
              ? 'Loading...'
              : summary?.active_incidents === 0
                ? 'No active incidents'
                : 'Requires attention'
          }
          detailClassName={
            !loading && summary?.active_incidents
              ? 'text-red-400'
              : 'text-emerald-400'
          }
        />

        <MetricCard
          label="Deployments"
          value="8"
          detail="Last 24 hours"
        />

        <MetricCard
          label="Availability"
          value="99.98%"
          detail="Last 30 days"
        />
      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-semibold text-white">
          Service Health
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Live service health monitoring will appear here.
        </p>
      </div>
    </section>
  )
}

export default Dashboard
