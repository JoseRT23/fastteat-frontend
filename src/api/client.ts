const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL ?? DEFAULT_API_BASE_URL
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)

  if (!headers.has('Content-Type') && init?.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    credentials: 'include',
    headers,
  })

  const responseText = await response.text()
  const payload = responseText ? JSON.parse(responseText) : null

  if (!response.ok) {
    throw new Error(payload?.message ?? 'La solicitud falló')
  }

  return payload as T
}
