import type { Product } from '../types'
import { PageHeader } from '../components/ui/PageHeader'

interface CustomerProductsPageProps {
  businessId: string | null
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function CustomerProductsPage({ businessId, products, onAddToCart }: CustomerProductsPageProps) {
  return ( <section className="space-y-6"> <PageHeader eyebrow="Catálogo" title="Productos del negocio" description={`Negocio seleccionado: ${businessId ?? 'Sin selección'}`} />

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
  className="cursor-pointer rounded-xl bg-secondary-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-200 hover:shadow-md"
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
