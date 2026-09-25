type Deployment = {
  id: string
  service: string
  version: string
  environment: string
  status: 'Successful' | 'Failed' | 'In Progress'
  deployedBy: string
  deployedAt: string
}

const deployments: Deployment[] = [
  {
    id: 'DEP-2084',
    service: 'Web Application',
    version: 'v2.14.0',
    environment: 'Production',
    status: 'Successful',
    deployedBy: 'CI Pipeline',
    deployedAt: '12 minutes ago',
  },
  {
    id: 'DEP-2083',
    service: 'API Gateway',
    version: 'v1.18.3',
    environment: 'Production',
    status: 'Successful',
    deployedBy: 'CI Pipeline',
    deployedAt: '48 minutes ago',
  },
  {
    id: 'DEP-2082',
    service: 'Notification Worker',
    version: 'v3.7.1',
    environment: 'Production',
    status: 'In Progress',
    deployedBy: 'Marcus',
    deployedAt: '1 hour ago',
  },
  {
    id: 'DEP-2081',
    service: 'Payments API',
    version: 'v5.2.0',
    environment: 'Production',
    status: 'Failed',
    deployedBy: 'CI Pipeline',
    deployedAt: '3 hours ago',
  },
]

function Deployments() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Deployments</h2>
        <p className="mt-1 text-sm text-slate-400">
          Track application releases and deployment activity across environments.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <div>
            <h3 className="font-semibold">Deployment History</h3>
            <p className="mt-1 text-xs text-slate-500">
              Recent application releases
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="px-6 py-5 transition hover:bg-slate-800/40"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      deployment.status === 'Successful'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : deployment.status === 'Failed'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {deployment.status === 'Successful'
                      ? '✓'
                      : deployment.status === 'Failed'
                        ? '!'
                        : '↻'}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-slate-500">
                        {deployment.id}
                      </span>

                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">
                        {deployment.environment}
                      </span>
                    </div>

                    <h3 className="mt-2 font-medium text-slate-100">
                      {deployment.service}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {deployment.version} · {deployment.deployedBy} ·{' '}
                      {deployment.deployedAt}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-medium ${
                    deployment.status === 'Successful'
                      ? 'text-emerald-400'
                      : deployment.status === 'Failed'
                        ? 'text-red-400'
                        : 'text-amber-400'
                  }`}
                >
                  {deployment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Deployments
