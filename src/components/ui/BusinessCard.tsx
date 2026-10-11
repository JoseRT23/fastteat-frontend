import type { Product } from "../../types";
import { Badge } from "./Badge";

interface BusinessCardProps {
  product: Product;
  onClick?: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

export function BusinessCard({ product, onClick }: BusinessCardProps) {
  return (
    <article
      onClick={onClick}
      className={`overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/60 transition-colors hover:bg-slate-100 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex aspect-[16/10] items-center justify-center bg-neutral-100">
        {product.image ? (
          <img
            className="h-full w-full object-cover"
            src={product.image}
            alt={product.name}
          />
        ) : (
          <span className="text-sm text-neutral-500">Sin imagen</span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            {product.name}
          </h2>

          <Badge variant={product.active ? "success" : "neutral"}>
            {product.active ? "Activo" : "Inactivo"}
          </Badge>
        </div>

        <p className="text-sm text-neutral-500">{product.description}</p>

        <strong className="text-base font-bold text-neutral-900">
          {formatPrice(product.current_price)}
        </strong>
      </div>
    </article>
  );
}
