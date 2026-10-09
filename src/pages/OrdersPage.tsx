import { useState } from "react";
import type { Order } from "../types";
import { PageHeader } from "../components/ui";

interface OrdersPageProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const statusLabelMap: Record<Order["status"], string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En preparación",
  READY: "Listo",
  ACCEPTED: "Aceptado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const statusOptions: Order["status"][] = [
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

const statusDotMap: Record<Order["status"], string> = {
  PENDING: "bg-amber-400",
  IN_PROGRESS: "bg-blue-500",
  READY: "bg-emerald-500",
  ACCEPTED: "bg-sky-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function OrdersPage({ orders, onUpdateOrderStatus }: OrdersPageProps) {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  return (
    <section className="space-y-6">
      <PageHeader title="Pedidos" />

      <div className="grid gap-4">
        {orders.map((order) => (
          <article
            key={order.order_id}
            className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong className="block text-slate-900">
                  {order.customerName}
                </strong>

                <small className="text-xs text-slate-500">
                  {order.created_at}
                </small>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenOrderId(
                      openOrderId === order.order_id ? null : order.order_id,
                    )
                  }
                  className="flex min-w-3.5 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span>{statusLabelMap[order.status]}</span>

                  <span
                    className={`h-1 w-1 rounded-sm ${statusDotMap[order.status]}`}
                  />
                </button>

                {openOrderId === order.order_id && (
                  <div className="absolute right-0 z-20 mt-2 w-full min-w-47.5 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/70">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          onUpdateOrderStatus(order.order_id, status);
                          setOpenOrderId(null);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          order.status === status
                            ? "bg-slate-50 font-semibold text-slate-900"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span>{statusLabelMap[status]}</span>

                        <span
                          className={`h-1.5 w-1.5 rounded-sm ${statusDotMap[status]}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.order_item_id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {item.product_name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.quantity} u. × {formatPrice(item.unit_price)}
                    </p>
                  </div>

                  <span className="shrink-0 font-semibold text-slate-900">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-900">
              <strong>Total</strong>

              <span>{formatPrice(order.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
