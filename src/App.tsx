import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomerLayout } from './components/CustomerLayout'
import { Layout } from './components/Layout'
import { useAppContext } from './context/AppContext'
import { mockBusinessCatalog, mockInvitations, mockOrders, mockProducts, mockUsers } from './data/mockData'
import { CustomerCheckoutPage } from './pages/CustomerCheckoutPage'
import { CustomerExplorePage } from './pages/CustomerExplorePage'
import { CustomerOrdersPage } from './pages/CustomerOrdersPage'
import { CustomerProductsPage } from './pages/CustomerProductsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductsPage } from './pages/ProductsPage'
import { UsersPage } from './pages/UsersPage'
import type { Order, Product } from './types'

function App() {
  const { isAuthenticated, login, logout, cart, addToCart, removeFromCart, clearCart, cartCount } = useAppContext()
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>('biz-1')
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const currentUser = isAuthenticated ? mockUsers[0] : null

  const handleLogin = (_email: string, _password: string) => {
    login(_email, _password)
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

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((currentOrders) => currentOrders.map((order) => (order.order_id === orderId ? { ...order, status } : order)))
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/explore" replace />} />

      <Route
        path="/business/*"
        element={
          <Layout currentUser={currentUser} onLogout={handleLogout}>
            <Routes>
              <Route path="dashboard" element={<DashboardPage products={mockProducts} orders={orders} users={mockUsers} />} />
              <Route path="products" element={<ProductsPage products={mockProducts} />} />
              <Route path="orders" element={<OrdersPage orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />} />
              <Route path="users" element={<UsersPage users={mockUsers} invitations={mockInvitations} />} />
            </Routes>
          </Layout>
        }
      />

      <Route
        path="/*"
        element={
          <CustomerLayout cartCount={cartCount}>
            <Routes>
              <Route path="explore" element={<CustomerExplorePage onSelectBusiness={handleSelectBusiness} />} />
              <Route
                path="products"
                element={
                  <CustomerProductsPage
                    businessId={selectedBusinessId}
                    products={mockBusinessCatalog[selectedBusinessId ?? 'biz-1'] ?? mockProducts}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="checkout"
                element={
                  <CustomerCheckoutPage
                    cart={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onPlaceOrder={handlePlaceOrder}
                  />
                }
              />
              <Route path="my-orders" element={<CustomerOrdersPage orders={orders} />} />
            </Routes>
          </CustomerLayout>
        }
      />
    </Routes>
  )
}

export default App
