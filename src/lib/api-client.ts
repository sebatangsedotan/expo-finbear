import { useAuthStore } from '@/src/stores/auth.store'
import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.finbear.com'

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data: T
}

const api = axios.create({
  baseURL: BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('API Success:', response.config.url, response.data)
    if (response.data && response.data.success) {
      return response.data.data
    }
    return response.data
  },
  (error) => {
    console.error(
      'API Error:',
      error.config?.url,
      error.response?.data || error.message
    )
    const message =
      error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

const cleanUrl = (url: string) => (url.startsWith('/') ? url.substring(1) : url)

export const apiClient = {
  get: <T>(url: string, config?: any) => api.get<any, T>(cleanUrl(url), config),
  post: <T>(url: string, data?: any, config?: any) =>
    api.post<any, T>(cleanUrl(url), data, config),
  put: <T>(url: string, data?: any, config?: any) =>
    api.put<any, T>(cleanUrl(url), data, config),
  patch: <T>(url: string, data?: any, config?: any) =>
    api.patch<any, T>(cleanUrl(url), data, config),
  delete: <T>(url: string, config?: any) =>
    api.delete<any, T>(cleanUrl(url), config)
}
