import type { Product } from '../types'

interface CustomerCheckoutPageProps {
  cart: Product[]
  onRemoveFromCart: (productId: string) => void
  onPlaceOrder: () => void
}

export function CustomerCheckoutPage({ cart, onRemoveFromCart, onPlaceOrder }: CustomerCheckoutPageProps) {
  const total = cart.reduce((sum, item) => sum + item.current_price, 0)

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Carrito</span>
        <h2 className="text-2xl font-bold text-slate-900">Resumen de tu pedido</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
          {cart.length === 0 ? (
            <p className="text-sm text-slate-500">Tu carrito está vacío. Explora un negocio y añade productos.</p>
          ) : (
            <div className="grid gap-3">
              {cart.map((product) => (
                <div key={product.product_id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                  <div>
                    <strong className="block text-sm text-slate-900">{product.name}</strong>
                    <span className="text-xs text-slate-500">{product.current_price.toFixed(2)} €</span>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(product.product_id)}
                    className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm shadow-slate-200/60">
          <h3 className="mb-4 text-lg font-bold">Tu compra</h3>
          <div className="mb-4 flex items-center justify-between text-sm">
            <span>Total estimado</span>
            <strong>{total.toFixed(2)} €</strong>
          </div>
          <button
            onClick={onPlaceOrder}
            className="w-full cursor-pointer rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </section>
  )
}
