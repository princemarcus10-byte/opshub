import { useEffect, useState } from 'react'

import {
  createDeployment,
  fetchDeployments,
  type Deployment,
} from '../api'

function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [service, setService] = useState('')
  const [version, setVersion] = useState('')
  const [environment, setEnvironment] = useState('Production')
  const [status, setStatus] = useState('Successful')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchDeployments()
      .then(setDeployments)
      .catch(() => setError('Unable to load deployments'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreateDeployment(event: React.FormEvent) {
    event.preventDefault()

    if (!service.trim() || !version.trim()) {
      return
    }

    setCreating(true)
    setError('')

    try {
      const deployment = await createDeployment(
        service.trim(),
        version.trim(),
        environment,
        status,
      )

      setDeployments((current) => [deployment, ...current])
      setService('')
      setVersion('')
      setEnvironment('Production')
      setStatus('Successful')
      setShowForm(false)
    } catch {
      setError('Unable to create deployment')
    } finally {
      setCreating(false)
    }
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Deployments</h2>
          <p className="mt-1 text-sm text-slate-400">
            Track application releases across environments.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          {showForm ? 'Cancel' : 'Create Deployment'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateDeployment}
          className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Create Deployment
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Service
              </label>
              <input
                value={service}
                onChange={(event) => setService(event.target.value)}
                placeholder="e.g. API Gateway"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Version
              </label>
              <input
                value={version}
                onChange={(event) => setVersion(event.target.value)}
                placeholder="e.g. v1.2.0"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Environment
              </label>
              <select
                value={environment}
                onChange={(event) => setEnvironment(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              >
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              >
                <option>Successful</option>
                <option>Failed</option>
                <option>In Progress</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Deployment'}
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
            Loading deployments...
          </div>
        )}

        {!loading && deployments.length === 0 && (
          <div className="p-6 text-sm text-slate-400">
            No deployments recorded.
          </div>
        )}

        {!loading && deployments.length > 0 && (
          <div className="divide-y divide-slate-800">
            {deployments.map((deployment) => (
              <div
                key={deployment.id}
                className="flex items-center justify-between gap-6 p-5"
              >
                <div className="min-w-0">
                  <h3 className="font-medium text-white">
                    {deployment.service}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {deployment.version} · {deployment.environment}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    deployment.status === 'Successful'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : deployment.status === 'Failed'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {deployment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Deployments
