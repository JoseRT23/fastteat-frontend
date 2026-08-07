const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

const API_TOKEN_KEY = 'fastteat-auth-token'

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL ?? DEFAULT_API_BASE_URL
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(API_TOKEN_KEY)
}

export function setStoredToken(token: string | null) {
  if (typeof window === 'undefined') return
  if (token) {
    window.localStorage.setItem(API_TOKEN_KEY, token)
    return
  }
  window.localStorage.removeItem(API_TOKEN_KEY)
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken()
  const headers = new Headers(init?.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (!headers.has('Content-Type') && init?.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
  })

  const responseText = await response.text()
  const payload = responseText ? JSON.parse(responseText) : null

  if (!response.ok) {
    throw new Error(payload?.message ?? 'La solicitud falló')
  }

  return payload as T
}
