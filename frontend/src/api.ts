const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export type Service = {
  id: number
  name: string
  team: string
  status: string
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/services/`)

  if (!response.ok) {
    throw new Error('Failed to fetch services')
  }

  return response.json()
}

export async function createService(
  name: string,
  team: string,
): Promise<Service> {
  const response = await fetch(
    `${API_BASE_URL}/services/?name=${encodeURIComponent(name)}&team=${encodeURIComponent(team)}`,
    {
      method: 'POST',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create service')
  }

  return response.json()
}

export type Incident = {
  id: number
  title: string
  service: string
  severity: string
  status: string
}

export async function fetchIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/incidents/`)

  if (!response.ok) {
    throw new Error('Failed to fetch incidents')
  }

  return response.json()
}

export async function createIncident(
  title: string,
  service: string,
  severity: string,
): Promise<Incident> {
  const params = new URLSearchParams({
    title,
    service,
    severity,
  })

  const response = await fetch(`${API_BASE_URL}/incidents/?${params}`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to create incident')
  }

  return response.json()
}

export async function updateIncidentStatus(
  incidentId: number,
  status: string,
): Promise<Incident> {
  const params = new URLSearchParams({ status })

  const response = await fetch(
    `${API_BASE_URL}/incidents/${incidentId}?${params}`,
    {
      method: 'PATCH',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update incident')
  }

  return response.json()
}

export type DashboardSummary = {
  services: number
  active_incidents: number
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const response = await fetch(`${API_BASE_URL}/dashboard/summary`)

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary')
  }

  return response.json()
}

export type Deployment = {
  id: number
  service: string
  version: string
  environment: string
  status: string
}

export async function fetchDeployments(): Promise<Deployment[]> {
  const response = await fetch(`${API_BASE_URL}/deployments/`)

  if (!response.ok) {
    throw new Error('Failed to fetch deployments')
  }

  return response.json()
}

export async function createDeployment(
  service: string,
  version: string,
  environment: string,
  status: string,
): Promise<Deployment> {
  const params = new URLSearchParams({
    service,
    version,
    environment,
    status,
  })

  const response = await fetch(`${API_BASE_URL}/deployments/?${params}`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to create deployment')
  }

  return response.json()
}
