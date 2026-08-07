import type { BusinessUser, Invitation, Order, Product } from '../types'

export const mockProducts: Product[] = [
  {
    product_id: 'prod-1',
    name: 'Café Latte',
    description: 'Café con leche espumosa.',
    current_price: 4.5,
    active: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  },
  {
    product_id: 'prod-2',
    name: 'Tostadas de Jamón',
    description: 'Tostadas con jamón y queso.',
    current_price: 6.5,
    active: true,
  },
  {
    product_id: 'prod-3',
    name: 'Smoothie Verde',
    description: 'Batido natural con espinaca y mango.',
    current_price: 5.8,
    active: false,
  },
]

export const mockBusinessCatalog: Record<string, Product[]> = {
  'biz-1': [
    {
      product_id: 'prod-1',
      name: 'Café Latte',
      description: 'Café con leche espumosa.',
      current_price: 4.5,
      active: true,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    },
    {
      product_id: 'prod-2',
      name: 'Tostadas de Jamón',
      description: 'Tostadas con jamón y queso.',
      current_price: 6.5,
      active: true,
    },
  ],
  'biz-2': [
    {
      product_id: 'prod-4',
      name: 'Burger de la Casa',
      description: 'Hamburguesa jugosa con queso.',
      current_price: 8.95,
      active: true,
    },
    {
      product_id: 'prod-5',
      name: 'Patatas Deluxe',
      description: 'Patatas con alioli y hierbas.',
      current_price: 4.2,
      active: true,
    },
  ],
}

export const mockOrders: Order[] = [
  {
    order_id: 'ord-1',
    user_id: 'usr-1',
    customerName: 'Ana López',
    business_id: 'biz-1',
    status: 'PENDING',
    total: 11,
    created_at: '2026-07-12T10:30:00.000Z',
    items: [
      {
        order_item_id: 'item-1',
        product_id: 'prod-1',
        product_name: 'Café Latte',
        unit_price: 4.5,
        quantity: 2,
        subtotal: 9,
      },
      {
        order_item_id: 'item-2',
        product_id: 'prod-2',
        product_name: 'Tostadas de Jamón',
        unit_price: 6.5,
        quantity: 1,
        subtotal: 6.5,
      },
    ],
  },
  {
    order_id: 'ord-2',
    user_id: 'usr-2',
    customerName: 'Luis García',
    business_id: 'biz-1',
    status: 'IN_PROGRESS',
    total: 10.8,
    created_at: '2026-07-12T11:00:00.000Z',
    items: [
      {
        order_item_id: 'item-3',
        product_id: 'prod-3',
        product_name: 'Smoothie Verde',
        unit_price: 5.8,
        quantity: 2,
        subtotal: 11.6,
      },
    ],
  },
]

export const mockUsers: BusinessUser[] = [
  {
    user_id: 'usr-admin',
    name: 'Martín Ruiz',
    email: 'manager@fastteat.com',
    role: 'ADMIN',
    active: true,
  },
  {
    user_id: 'usr-emp',
    name: 'Clara Pérez',
    email: 'employee@fastteat.com',
    role: 'EMPLOYEE',
    active: true,
  },
]

export const mockInvitations: Invitation[] = [
  {
    invitation_id: 'inv-1',
    email: 'nuevo@fastteat.com',
    role: 'EMPLOYEE',
    status: 'PENDING',
  },
  {
    invitation_id: 'inv-2',
    email: 'ana@fastteat.com',
    role: 'CUSTOMER',
    status: 'ACCEPTED',
  },
]
