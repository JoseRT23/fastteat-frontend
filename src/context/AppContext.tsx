import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { apiService } from '../services/apiService'
import type { Product } from '../types'

interface CartItem extends Product {
  quantity: number
}

interface AppContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  cartCount: number
  authError: string | null
  isLoading: boolean
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'fastteat-cart'

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart])

  useEffect(() => {
    apiService.getCurrentUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
  }, [])  

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setAuthError('Completa tus credenciales para entrar.')
      return
    }

    setIsLoading(true)
    setAuthError(null)

    try {
      await apiService.login(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
      setAuthError(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCart([])
    setAuthError(null)
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
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    authError,
    isLoading,
  }), [isAuthenticated, cart, cartCount, authError, isLoading])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppContextProvider')
  }
  return context
}
