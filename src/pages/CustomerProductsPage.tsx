import { useMemo, useState } from "react";
import { MotionIcon } from "motion-icons-react";
import type { Product } from '../types'
import { PageHeader } from '../components/ui/PageHeader'

interface CustomerProductsPageProps {
  businessId: string | null
  products: Product[]
  onAddToCart: (product: Product) => void
}

const productImages: Record<string, string> = {
  "prod-1":
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  "prod-2":
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  "prod-3":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
  "prod-4":
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  "prod-5":
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
  "prod-6":
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80",
};

const productPrices: Record<string, number> = {
  "prod-1": 15000,
  "prod-2": 18500,
  "prod-3": 22000,
  "prod-4": 27500,
  "prod-5": 31000,
  "prod-6": 35000,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function CustomerProductsPage({ businessId, products, onAddToCart }: CustomerProductsPageProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch),
    );
  }, [products, search]);

  const getProductImage = (product: Product) => {
    return product.image || productImages[product.product_id];
  };

  const getProductPrice = (product: Product) => {
    return productPrices[product.product_id] ?? product.current_price;
  };

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Catálogo"
        title="Descubre nuestros productos"
        description="Explora los productos disponibles y añade tus favoritos al carrito."
        actions={
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />

            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <MotionIcon name="LucideSearch" animation="success" />
            </div>
          </div>
        }
      />

      {businessId && (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
            <MotionIcon name="LucideStore" />
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Productos disponibles
            </p>

            <p className="text-xs text-slate-500">
              Selecciona un producto para añadirlo a tu carrito.
            </p>
          </div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const image = getProductImage(product);
            const price = getProductPrice(product);

            return (
              <article key={product.product_id} className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <MotionIcon name="LucideImageOff" />
                      </div>

                      <span className="text-xs font-medium">
                        Sin imagen
                      </span>
                    </div>
                  )}

                  {!product.active && (
                    <div className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1.5 text-xs font-semibold text-white">
                      No disponible
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {product.name}
                    </h3>

                    <p className="line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Precio
                      </span>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {formatPrice(price)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      disabled={!product.active}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Añadir
                      <MotionIcon name="LucideShoppingCart" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm shadow-slate-200/60">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <MotionIcon name="LucideSearchX" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No encontramos productos
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Prueba con otro nombre o revisa los productos disponibles.
          </p>
        </div>
      )}
    </section>
  )
}
