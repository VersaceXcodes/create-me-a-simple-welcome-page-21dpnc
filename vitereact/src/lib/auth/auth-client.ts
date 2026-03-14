import { createAuthClient } from 'better-auth/react'

const LOCAL_API_BASE_URL = 'http://localhost:3000'

const normalizeUrl = (value: string): string => value.replace(/\/+$/, '')

const readFirstUrl = (...values: Array<string | undefined>): string | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return normalizeUrl(value.trim())
    }
  }

  return null
}

const isLocalPreviewHost = (hostname: string): boolean => {
  const normalizedHost = hostname.toLowerCase()
  return normalizedHost === 'localhost' || normalizedHost === '127.0.0.1'
}

declare global {
  interface Window {
    __LAUNCHPULSE_BACKEND_URL__?: string
    __BACKEND_URL__?: string
  }
}

const resolveApiBaseUrl = (): string => {
  const envUrl = readFirstUrl(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_BACKEND_URL)

  if (envUrl) {
    return envUrl
  }

  if (typeof window !== 'undefined') {
    const runtimeUrl = readFirstUrl(window.__LAUNCHPULSE_BACKEND_URL__, window.__BACKEND_URL__)

    if (runtimeUrl) {
      return runtimeUrl
    }

    if (!isLocalPreviewHost(window.location.hostname)) {
      console.warn(
        '[auth] Missing VITE_API_BASE_URL/VITE_BACKEND_URL. Falling back to the current origin for Better Auth requests.'
      )
      return normalizeUrl(window.location.origin)
    }
  }

  return LOCAL_API_BASE_URL
}

export const API_BASE_URL = resolveApiBaseUrl()

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  fetchOptions: {
    credentials: 'include',
  },
})
