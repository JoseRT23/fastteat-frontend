import type { Product } from '../types'

interface CustomerProductsPageProps {
  businessId: string | null
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function CustomerProductsPage({ businessId, products, onAddToCart }: CustomerProductsPageProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Catálogo</span>
        <h2 className="text-2xl font-bold text-slate-900">Productos del negocio</h2>
        <p className="text-sm text-slate-500">Negocio seleccionado: {businessId ?? 'Sin selección'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.product_id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/60">
            <div className="mb-3 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
              {product.image ? (
                <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
              ) : (
                <span className="text-sm text-slate-500">Sin imagen</span>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.description}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base font-semibold text-slate-900">{product.current_price.toFixed(2)} €</strong>
                <button
                  onClick={() => onAddToCart(product)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Añadir
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
