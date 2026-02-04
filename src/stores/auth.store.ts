import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  last_sign_in?: string
  created_at?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isInitialized: boolean

  // Actions
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  setInitialized: (val: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true
        }),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false
        }),

      setInitialized: (val) => set({ isInitialized: val })
    }),
    {
      name: 'finbear-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setInitialized(true)
      }
    }
  )
)
