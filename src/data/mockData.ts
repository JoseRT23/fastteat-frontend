import type { BusinessUser, Invitation, Order, Product, Business } from '../types'

export const mockProducts: Product[] = [
  {
    product_id: 'prod-1',
    name: 'Café Latte',
    description: 'Café con leche espumosa.',
    current_price: 8500,
    active: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  },
  {
    product_id: 'prod-2',
    name: 'Tostadas de Jamón',
    description: 'Tostadas con jamón y queso.',
    current_price: 12000,
    active: true,
  },
  {
    product_id: 'prod-3',
    name: 'Smoothie Verde',
    description: 'Batido natural con espinaca y mango.',
    current_price: 14000,
    active: false,
  },
]

export const mockBusinessCatalog: Record<string, Product[]> = {
  'biz-1': [
    {
      product_id: 'prod-1',
      name: 'Café Latte',
      description: 'Café con leche espumosa.',
      current_price: 8500,
      active: true,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    },
    {
      product_id: 'prod-2',
      name: 'Tostadas de Jamón',
      description: 'Tostadas con jamón y queso.',
      current_price: 12000,
      active: true,
    },
  ],
  'biz-2': [
    {
      product_id: 'prod-4',
      name: 'Burger de la Casa',
      description: 'Hamburguesa jugosa con queso.',
      current_price: 24000,
      active: true,
    },
    {
      product_id: 'prod-5',
      name: 'Patatas Deluxe',
      description: 'Patatas con alioli y hierbas.',
      current_price: 11000,
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
    total: 29000,
    created_at: '2026-07-12T10:30:00.000Z',
    items: [
      {
        order_item_id: 'item-1',
        product_id: 'prod-1',
        product_name: 'Café Latte',
        unit_price: 8500,
        quantity: 2,
        subtotal: 17000,
      },
      {
        order_item_id: 'item-2',
        product_id: 'prod-2',
        product_name: 'Tostadas de Jamón',
        unit_price: 12000,
        quantity: 1,
        subtotal: 12000,
      },
    ],
  },
  {
    order_id: 'ord-2',
    user_id: 'usr-2',
    customerName: 'Luis García',
    business_id: 'biz-1',
    status: 'ACCEPTED',
    total: 28000,
    created_at: '2026-07-12T11:00:00.000Z',
    items: [
      {
        order_item_id: 'item-3',
        product_id: 'prod-3',
        product_name: 'Smoothie Verde',
        unit_price: 14000,
        quantity: 2,
        subtotal: 28000,
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

export const mockBusinesses: Business[] = [
  {
    business_id: 'biz-1',
    name: 'Café del Sol',
    address: 'Av. Principal 45',
    mobile: '+34 600 123 456',
    email: 'cafedelsol@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
  },
  {
    business_id: 'biz-2',
    name: 'Bistro Madera',
    address: 'Calle Real 12',
    mobile: '+34 600 234 567',
    email: 'bistromadera@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de',
  },
  {
    business_id: 'biz-3',
    name: 'La Terraza',
    address: 'Plaza Mayor 8',
    mobile: '+34 600 345 678',
    email: 'laterraza@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    business_id: 'biz-4',
    name: 'Sabores de Casa',
    address: 'Calle Central 25',
    mobile: '+34 600 456 789',
    email: 'saboresdecasa@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
  },
  {
    business_id: 'biz-5',
    name: 'El Rincón Gourmet',
    address: 'Carrera 10 #15-20',
    mobile: '+34 600 567 890',
    email: 'rincon@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
  },
  {
    business_id: 'biz-6',
    name: 'Delicias Urbanas',
    address: 'Avenida del Parque 18',
    mobile: '+34 600 678 901',
    email: 'delicias@fastteat.com',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
]