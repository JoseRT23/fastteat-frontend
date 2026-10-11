import type { Product } from "../../types";
import { Badge } from "./Badge";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  actionLabel?: string;
}

export function ProductCard({
  product,
  onClick,
  actionLabel = "Editar",
}: ProductCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Imagen del producto */}
      <div className="relative aspect-[16/8] shrink-0 overflow-hidden bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={`Imagen de ${product.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-400 shadow-sm">
              {product.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {/* Disponibilidad */}
        <div className="absolute left-3 top-3">
          <Badge variant={product.active ? "success" : "neutral"}>
            {product.active ? "Disponible" : "No disponible"}
          </Badge>
        </div>

        {/* Calificación */}
        {typeof product.rating === "number" && (
          <div
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm"
            aria-label={`Calificación: ${product.rating.toFixed(1)} de 5`}
          >
            <span
              aria-hidden="true"
              className="text-sm leading-none text-amber-500"
            >
              ★
            </span>

            <span className="text-xs font-bold text-slate-800">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Nombre y descripción */}
        <div className="min-w-0">
          <h3 className="line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-slate-900">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
            {product.description || "Sin descripción disponible."}
          </p>
        </div>

        {/* Precio y botón alineados abajo */}
        <div className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-5">
          <span className="min-w-0 text-base font-bold leading-6 text-slate-900 sm:text-lg">
            {product.current_price.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            })}
          </span>

          {onClick && (
            <button
              type="button"
              onClick={onClick}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:px-4"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
