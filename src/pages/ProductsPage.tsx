import { useEffect, useState, type FormEvent } from 'react'
import { Modal } from '../components/Modal'
import { Badge, Button, PageHeader } from '../components/ui'
import type { Product } from '../types'

interface ProductsPageProps {
  products: Product[]
}

interface ProductFormState {
  name: string
  description: string
  current_price: string
  active: boolean
}

const emptyDraft = (): ProductFormState => ({ name: '', description: '', current_price: '', active: true })

export function ProductsPage({ products }: ProductsPageProps) {
  const [productList, setProductList] = useState<Product[]>(products)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [draft, setDraft] = useState<ProductFormState>(emptyDraft())

  useEffect(() => {
    setProductList(products)
  }, [products])

  const openCreateModal = () => {
    setEditingProduct(null)
    setDraft(emptyDraft())
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setDraft({
      name: product.name,
      description: product.description,
      current_price: product.current_price.toString(),
      active: product.active,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setDraft(emptyDraft())
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const price = Number.parseFloat(draft.current_price)

    if (!draft.name || !draft.description || Number.isNaN(price)) {
      return
    }

    if (editingProduct) {
      setProductList((current) => current.map((product) => (product.product_id === editingProduct.product_id ? { ...product, name: draft.name, description: draft.description, current_price: price, active: draft.active } : product)))
    } else {
      const nextProduct: Product = {
        product_id: `prod-${Date.now()}`,
        name: draft.name,
        description: draft.description,
        current_price: price,
        active: draft.active,
      }
      setProductList((current) => [nextProduct, ...current])
    }

    closeModal()
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Catálogo"
        title="Productos"
        actions={
          <Button
            onClick={openCreateModal}
            className="rounded-full px-5 hover:brightness-125 hover:shadow-lg"
          >
            Nuevo producto
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productList.map((product) => (
          <article
            className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/60 cursor-pointer hover:bg-slate-100"
            key={product.product_id}
            onClick={() => openEditModal(product)}
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
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base font-bold text-neutral-900">
                  {product.current_price.toFixed(2)} €
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        title={editingProduct ? "Editar producto" : "Crear producto"}
        onClose={closeModal}
      >
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Nombre</span>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Descripción</span>
            <textarea
              className="min-h-24 rounded-xl border border-slate-200 px-3 py-2"
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Precio</span>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2"
              type="number"
              step="0.01"
              value={draft.current_price}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  current_price: event.target.value,
                }))
              }
              required
            />
          </label>
          <label className="flex items-center justify-between text-sm font-medium text-slate-700">
            <span>Estado del producto</span>

            <button
              type="button"
              role="switch"
              aria-checked={draft.active}
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  active: !current.active,
                }))
              }
              className={`relative h-6 w-12 rounded-full transition-colors ${
                draft.active ? "bg-success-700" : "bg-slate-300"
              }`}
            >
              <span
                className={` cursor-pointer absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  draft.active ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className=" cursor-pointer rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700"
            >
              Cancelar
            </button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
