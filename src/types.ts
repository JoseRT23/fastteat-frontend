export type UserRole = 'ADMIN' | 'OWNER' | 'STAFF' | 'EMPLOYEE' | 'CUSTOMER'

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'READY' | 'ACCEPTED' | 'CANCELLED' | 'DELIVERED'

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'CANCELLED'

export interface Product {
  product_id: string
  business_id?: string
  name: string
  description: string
  current_price: number
  active: boolean
  image?: string
}

export interface OrderItem {
  order_item_id: string
  product_id: string
  product_name: string
  unit_price: number
  quantity: number
  subtotal: number
}

export interface Order {
  order_id: string
  user_id?: string
  customerName?: string
  business_id?: string
  status: OrderStatus
  total: number
  created_at: string
  items: OrderItem[]
  user?: {
    name: string
  }
}

export interface BusinessUser {
  user_id: string
  name: string
  email: string
  role: UserRole
  active: boolean
}

export interface Invitation {
  invitation_id: string
  email: string
  role: UserRole
  status: InvitationStatus
}

export interface Business {
  business_id: string
  name: string
  address?: string | null
  menu_url?: string | null
  mobile?: string
  email?: string
}
