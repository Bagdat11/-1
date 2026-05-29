import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '../types'

const SESSION_KEY = 'qaztu_session'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string, remember: boolean) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEMO_USER: AuthUser = {
  id: '1',
  name: 'Askar Bekmukhanov',
  username: 'admin',
  role: 'System Administrator',
}

function readSession(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readSession())

  const login = useCallback(async (username: string, password: string, remember: boolean) => {
    await new Promise((r) => setTimeout(r, 400))
    const valid =
      (username === 'admin' && password === 'admin123') ||
      (username.length > 0 && password === 'password')

    if (!valid) return false

    const sessionUser = { ...DEMO_USER, username }
    const storage = remember ? localStorage : sessionStorage
    const other = remember ? sessionStorage : localStorage
    other.removeItem(SESSION_KEY)
    storage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    setUser(sessionUser)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
