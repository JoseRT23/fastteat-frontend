import type { Product } from "../types";
import { PageHeader } from "../components/ui/PageHeader";

interface CartItem extends Product {
  quantity: number;
}

interface CustomerCheckoutPageProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onPlaceOrder: () => void;
}

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

export function CustomerCheckoutPage({
  cart,
  onRemoveFromCart,
  onPlaceOrder,
}: CustomerCheckoutPageProps) {
  const getProductPrice = (product: Product) => {
    return productPrices[product.product_id] ?? product.current_price;
  };

  const total = cart.reduce(
    (sum, item) => sum + getProductPrice(item) * item.quantity,
    0,
  );

  return (
    <section className="space-y-6">
      <PageHeader title="Resumen de tu pedido" />

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_350px]">
        <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
          {cart.length === 0 ? (
            <p className="text-sm text-slate-500">
              Tu carrito está vacío. Explora un negocio y añade productos.
            </p>
          ) : (
            <div className="grid gap-3">
              {cart.map((product) => {
                const price = getProductPrice(product);
                const subtotal = price * product.quantity;

                return (
                  <div
                    key={product.product_id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4"
                  >
                    <div className="min-w-0">
                      <strong className="block text-sm font-semibold text-slate-900">
                        {product.name}
                      </strong>

                      <p className="mt-1 text-xs text-slate-500">
                        {product.quantity} u. × {formatPrice(price)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <strong className="text-sm font-bold text-slate-900">
                        {formatPrice(subtotal)}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          onRemoveFromCart(product.product_id)
                        }
                        className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-fit rounded-3xl bg-slate-900 p-5 text-white shadow-sm shadow-slate-200/60 lg:sticky lg:top-6">
          <h3 className="mb-4 text-lg font-bold">
            Tu compra
          </h3>

          <div className="mb-4 flex items-center justify-between text-sm">
            <span>Total estimado</span>

            <strong>{formatPrice(total)}</strong>
          </div>

          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={cart.length === 0}
            className="w-full cursor-pointer rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </section>
  );
}