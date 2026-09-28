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
