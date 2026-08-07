import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../types'

interface CartItem extends Product {
  quantity: number
}

interface AppContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  cartCount: number
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'fastteat-cart'
const USER_STORAGE_KEY = 'fastteat-user'

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem(USER_STORAGE_KEY))
  })
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isAuthenticated) {
      window.localStorage.setItem(USER_STORAGE_KEY, 'session-active')
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart])

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCart([])
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
  }), [isAuthenticated, cart, cartCount])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppContextProvider')
  }
  return context
}
