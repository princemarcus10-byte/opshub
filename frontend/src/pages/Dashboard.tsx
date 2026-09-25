import MetricCard from '../components/MetricCard'

function Dashboard() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          System Overview
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Monitor services, incidents, deployments, and platform health.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Services"
          value="12"
          detail="All operational"
          detailClassName="text-emerald-400"
        />

        <MetricCard
          label="Active Incidents"
          value="0"
          detail="No active incidents"
          detailClassName="text-emerald-400"
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
          detailClassName="text-emerald-400"
        />
      </section>

      <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Service Health</h3>
            <p className="mt-1 text-sm text-slate-500">
              Current production service status
            </p>
          </div>

          <span className="text-xs text-slate-500">Updated just now</span>
        </div>

        <div className="mt-6 flex items-center justify-center rounded-lg border border-dashed border-slate-800 py-16">
          <div className="text-center">
            <div className="text-sm font-medium text-slate-300">
              Monitoring data will appear here
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Backend integration coming next
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
