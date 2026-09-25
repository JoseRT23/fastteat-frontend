import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { CustomerLayout } from './components/CustomerLayout'
import { Layout } from './components/Layout'
import { useAppContext } from './context/AppContext'

import {
  mockBusinessCatalog,
  mockInvitations,
  mockOrders,
  mockProducts,
  mockUsers,
} from './data/mockData'

import { CustomerCheckoutPage } from './pages/CustomerCheckoutPage'
import { CustomerExplorePage } from './pages/CustomerExplorePage'
import { CustomerOrdersPage } from './pages/CustomerOrdersPage'
import { CustomerProductsPage } from './pages/CustomerProductsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductsPage } from './pages/ProductsPage'
import { RegisterPage } from './pages/RegisterPage'
import { UsersPage } from './pages/UsersPage'
import StorePage from './pages/StorePage'

import type { Order, Product } from './types'

function App() {
  const {
    isAuthenticated,
    currentUser,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    loginError,
    isLoginLoading,
  } = useAppContext()

  const [selectedBusinessId, setSelectedBusinessId] =
    useState<string | null>('biz-1')

  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const handleLogin = async (
    email: string,
    password: string,
  ) => {
    await login(email, password)
  }

  const handleLogout = () => {
    logout()
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) return

    clearCart()
  }

  const handleSelectBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId)
  }

  const handleUpdateOrderStatus = (
    orderId: string,
    status: Order['status'],
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.order_id === orderId
          ? { ...order, status }
          : order,
      ),
    )
  }

  return (
    <Routes>
      {/* Página principal */}
      <Route
        path="/"
        element={<Navigate to="/explore" replace />}
      />

      {/* Rutas del negocio */}
      <Route
        path="/business/*"
        element={
          <Routes>
            {/* Login */}
            <Route
              path="login"
              element={
                isAuthenticated ? (
                  <Navigate
                    to="/business/dashboard"
                    replace
                  />
                ) : (
                  <LoginPage
                    onLogin={handleLogin}
                    loginError={loginError}
                    isLoginLoading={isLoginLoading}
                  />
                )
              }
            />

            {/* Registro */}
            <Route
              path="register"
              element={
                isAuthenticated ? (
                  <Navigate
                    to="/business/dashboard"
                    replace
                  />
                ) : (
                  <RegisterPage />
                )
              }
            />

            {/* Rutas protegidas */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <Layout
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  >
                    <Routes>
                      {/* Dashboard */}
                      <Route
                        path="dashboard"
                        element={
                          <DashboardPage
                            products={mockProducts}
                            orders={orders}
                            users={mockUsers}
                          />
                        }
                      />

                      {/* Productos */}
                      <Route
                        path="products"
                        element={
                          <ProductsPage
                            products={mockProducts}
                          />
                        }
                      />

                      {/* Pedidos */}
                      <Route
                        path="orders"
                        element={
                          <OrdersPage
                            orders={orders}
                            onUpdateOrderStatus={
                              handleUpdateOrderStatus
                            }
                          />
                        }
                      />

                      {/* Usuarios */}
                      <Route
                        path="users"
                        element={
                          <UsersPage
                            users={mockUsers}
                            invitations={mockInvitations}
                          />
                        }
                      />

                      {/* Ruta por defecto del negocio */}
                      <Route
                        path="*"
                        element={
                          <Navigate
                            to="/business/dashboard"
                            replace
                          />
                        }
                      />
                    </Routes>
                  </Layout>
                ) : (
                  <Navigate
                    to="/business/login"
                    replace
                  />
                )
              }
            />
          </Routes>
        }
      />

      {/* Rutas del cliente */}
      <Route
        path="/*"
        element={
          <CustomerLayout cartCount={cartCount}>
            <Routes>
              {/* Explorar negocios */}
              <Route
                path="explore"
                element={
                  <CustomerExplorePage
                    onSelectBusiness={handleSelectBusiness}
                  />
                }
              />

              {/* Lista de negocios */}
              <Route
                path="businesses"
                element={
                  <StorePage
                    onSelectBusiness={handleSelectBusiness}
                  />
                }
              />

              {/* Productos */}
              <Route
                path="products"
                element={
                  <CustomerProductsPage
                    businessId={selectedBusinessId}
                    products={
                      mockBusinessCatalog[
                        selectedBusinessId ?? 'biz-1'
                      ] ?? mockProducts
                    }
                    onAddToCart={handleAddToCart}
                  />
                }
              />

              {/* Checkout */}
              <Route
                path="checkout"
                element={
                  <CustomerCheckoutPage
                    cart={cart}
                    onRemoveFromCart={
                      handleRemoveFromCart
                    }
                    onPlaceOrder={handlePlaceOrder}
                  />
                }
              />

              {/* Mis pedidos */}
              <Route
                path="my-orders"
                element={
                  <CustomerOrdersPage
                    orders={orders}
                  />
                }
              />

              {/* Ruta por defecto del cliente */}
              <Route
                path="*"
                element={
                  <Navigate
                    to="/explore"
                    replace
                  />
                }
              />
            </Routes>
          </CustomerLayout>
        }
      />
    </Routes>
  )
}

export default App