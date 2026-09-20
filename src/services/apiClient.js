const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000/api')
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '')
const API_USER_ID = import.meta.env.VITE_API_USER_ID || ''

export async function apiRequest(endpoint, options = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(API_USER_ID ? { 'X-User-ID': API_USER_ID } : {}),
    ...(options.headers || {}),
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.error?.message || data?.detail || `HTTP ${response.status}: Request failed`
    const error = new Error(message)
    error.status = response.status
    error.code = data?.error?.code
    throw error
  }

  return data
}

export async function checkBackendHealth() {
  try {
    const response = await apiRequest('/health', { method: 'GET' })
    return { online: response?.status === 'ok', data: response }
  } catch (error) {
    return { online: false, error: error.message }
  }
}

export function getApiBaseUrl() {
  return API_BASE_URL
}

export default {
  get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
}
