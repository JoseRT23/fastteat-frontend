import { apiRequest } from '../api/client'
import type { Business, BusinessUser, Invitation, Order, Product } from '../types'

export interface LoginResponse {
  token?: string
  message?: string
  multipleBusinesses?: boolean
  businesses?: Array<{ business_id: string; business_name: string }>
}

export interface ApiEnvelope<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface User {
  user_id: string
  name: string
  email: string
  business_id?: string
}

function normalizeOrderStatus(status: Order['status']): Order['status'] {
  if (status === 'IN_PROGRESS' || status === 'READY') {
    return 'ACCEPTED'
  }

  return status
}

export const apiService = {
  async login(email: string, password: string) {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async getCurrentUser() {
    return apiRequest<User>('/auth/me')
  },  

  async businessLogin(email: string, password: string, businessId: string) {
    return apiRequest<LoginResponse>('/auth/business-login', {
      method: 'POST',
      body: JSON.stringify({ email, password, business_id: businessId }),
    })
  },

  async getProductsByBusiness(businessId: string) {
    return apiRequest<Product[]>(`/products/business/${businessId}`)
  },

  async getProducts() {
    return apiRequest<ApiEnvelope<Product>>('/products')
  },

  async createProduct(payload: Partial<Product> & { business_id?: string }) {
    return apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async updateProduct(productId: string, payload: Partial<Product>) {
    return apiRequest<Product>(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
  },

  async getOrders() {
    return apiRequest<ApiEnvelope<Order>>('/orders')
  },

  async getMyOrders() {
    return apiRequest<Order[]>('/orders/user')
  },

  async createOrder(payload: { businessId: string; items: Array<{ productId: string; quantity: number }> }) {
    return apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    return apiRequest<Order>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: normalizeOrderStatus(status) }),
    })
  },

  async createUser(payload: { name: string; email: string; phone: string; password: string }) {
    return apiRequest<BusinessUser>('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async getInvitations() {
    return apiRequest<Invitation[]>('/invitations')
  },

  async inviteUser(payload: { email: string; role: string }) {
    return apiRequest<{ message: string }>('/business/invite-user', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async getBusinesses() {
    return apiRequest<ApiEnvelope<Business>>('/business')
  },
  
  async checkBusinessRegistrationEmail(email: string) {
    return apiRequest<{ exists: boolean }>(`/business/check-user?email=${encodeURIComponent(email)}`)
  },
  
  async registerBusiness(payload: {
    user: { email: string; name?: string; phone?: string; password?: string }
    business: { name: string; email: string; mobile: string; address?: string }
  }) {
    return apiRequest<{ business: Business; user_id: string }>('/business/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
