import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { apiService, type LoginResponse, type User } from '../services/apiService'
import type { Product } from '../types'

interface CartItem extends Product {
  quantity: number
}

interface AppContextValue {
  isAuthenticated: boolean
  currentUser?: User | undefined
  login: (email: string, password: string) => Promise<LoginResponse | undefined>
  businessLogin: (email: string, password: string, businessId?: string) => Promise<LoginResponse | undefined>
  logout: () => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  cartCount: number
  loginError: string | null
  isLoginLoading: boolean
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'fastteat-cart'

export function AppContextProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const initialPathname = useRef(location.pathname)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart])

  useEffect(() => {
    const isProtectedBusinessRoute = /^\/business\/(?!login(?:\/|$)|register(?:\/|$))/.test(initialPathname.current)
    const isCustomerRoute = !initialPathname.current.startsWith('/business/')

    if (!isProtectedBusinessRoute && !isCustomerRoute) {
      return
    }

    apiService.getCurrentUser()
      .then((data) => {
        setIsAuthenticated(true)
        setCurrentUser(data)
      })
      .catch(() => setIsAuthenticated(false))
  }, [])

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setLoginError('Completa tus credenciales para entrar.')
      return undefined
    }

    setIsLoginLoading(true)
    setLoginError(null)

    try {
      const result = await apiService.login(email, password)

      if (result.multipleBusinesses) {
        setIsAuthenticated(false)
        return result
      }

      setCurrentUser(await apiService.getCurrentUser())
      setIsAuthenticated(true)
      return result
    } catch (error) {
      setIsAuthenticated(false)
      setLoginError(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
      return undefined
    } finally {
      setIsLoginLoading(false)
    }
  }

  const businessLogin = async (email: string, password: string, businessId?: string) => {
    if (!email || !password) {
      setLoginError('Completa tus credenciales para entrar.')
      return undefined
    }

    setIsLoginLoading(true)
    setLoginError(null)

    try {
      const result = await apiService.businessLogin(email, password, businessId)

      if (result.multipleBusinesses) {
        setIsAuthenticated(false)
        return result
      }

      if (!result.token) {
        throw new Error('No se recibió el token de acceso')
      }

      setCurrentUser(await apiService.getCurrentUser())
      setIsAuthenticated(true)
      return result
    } catch (error) {
      setIsAuthenticated(false)
      setLoginError(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
      return undefined
    } finally {
      setIsLoginLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCart([])
    setLoginError(null)
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === product.product_id)
      if (existing) {
        return prev.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const value = useMemo<AppContextValue>(() => ({
    isAuthenticated,
    currentUser,
    login,
    businessLogin,
    logout,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    loginError,
    isLoginLoading,
  }), [isAuthenticated, currentUser, cart, cartCount, loginError, isLoginLoading])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppContextProvider')
  }
  return context
}
