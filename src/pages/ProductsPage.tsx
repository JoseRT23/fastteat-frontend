import { useEffect, useState, type FormEvent } from "react";
import { Modal } from "../components/Modal";
import { Button, PageHeader, BusinessCard } from "../components/ui";
import type { Product } from "../types";

interface ProductsPageProps {
  products: Product[];
}

interface Category {
  category_id: string;
  name: string;
}

interface SubCategory {
  sub_category_id: string;
  category_id: string;
  name: string;
}

interface ProductFormState {
  name: string;
  description: string;
  current_price: string;
  category_id: string;
  sub_category_id: string;
  active: boolean;
}

const mockCategories: Category[] = [
  { category_id: "cat-1", name: "Hamburguesas" },
  { category_id: "cat-2", name: "Pizzas" },
  { category_id: "cat-3", name: "Bebidas" },
  { category_id: "cat-4", name: "Comida mexicana" },
];

const mockSubCategories: SubCategory[] = [
  {
    sub_category_id: "sub-1",
    category_id: "cat-1",
    name: "Combos de hamburguesa",
  },
  {
    sub_category_id: "sub-2",
    category_id: "cat-1",
    name: "Hamburguesas clásicas",
  },
  {
    sub_category_id: "sub-3",
    category_id: "cat-1",
    name: "Hamburguesas especiales",
  },
  { sub_category_id: "sub-4", category_id: "cat-2", name: "Pizzas clásicas" },
  { sub_category_id: "sub-5", category_id: "cat-2", name: "Pizzas especiales" },
  { sub_category_id: "sub-6", category_id: "cat-2", name: "Pizzas familiares" },
  { sub_category_id: "sub-7", category_id: "cat-3", name: "Gaseosas" },
  { sub_category_id: "sub-8", category_id: "cat-3", name: "Jugos naturales" },
  { sub_category_id: "sub-9", category_id: "cat-3", name: "Agua" },
  { sub_category_id: "sub-10", category_id: "cat-4", name: "Tacos" },
  { sub_category_id: "sub-11", category_id: "cat-4", name: "Burritos" },
];

const emptyDraft = (): ProductFormState => ({
  name: "",
  description: "",
  current_price: "",
  category_id: "",
  sub_category_id: "",
  active: true,
});

export function ProductsPage({ products }: ProductsPageProps) {
  const [productList, setProductList] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draft, setDraft] = useState<ProductFormState>(emptyDraft());
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const loadSubCategories = (categoryId: string) => {
    if (!categoryId) {
      setSubCategories([]);
      return;
    }

    const filteredSubCategories = mockSubCategories.filter(
      (subCategory) => subCategory.category_id === categoryId,
    );

    setSubCategories(filteredSubCategories);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setSubCategories([]);
    setDraft(emptyDraft());
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);

    const subCategory = mockSubCategories.find(
      (item) => item.sub_category_id === product.sub_category_id,
    );

    const categoryId = subCategory?.category_id ?? "";

    setDraft({
      name: product.name,
      description: product.description,
      current_price: product.current_price.toString(),
      category_id: categoryId,
      sub_category_id: product.sub_category_id ?? "",
      active: product.active,
    });

    loadSubCategories(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setSubCategories([]);
    setDraft(emptyDraft());
  };

  const handleCategoryChange = (categoryId: string) => {
    setDraft((current) => ({
      ...current,
      category_id: categoryId,
      sub_category_id: "",
    }));

    loadSubCategories(categoryId);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number.parseFloat(draft.current_price);

    if (
      !draft.name.trim() ||
      !draft.description.trim() ||
      Number.isNaN(price) ||
      price < 0 ||
      !draft.category_id ||
      !draft.sub_category_id
    ) {
      return;
    }

    if (editingProduct) {
      setProductList((current) =>
        current.map((product) =>
          product.product_id === editingProduct.product_id
            ? {
                ...product,
                name: draft.name.trim(),
                description: draft.description.trim(),
                current_price: price,
                sub_category_id: draft.sub_category_id,
                active: draft.active,
              }
            : product,
        ),
      );
    } else {
      const nextProduct: Product = {
        product_id: `prod-${Date.now()}`,
        name: draft.name.trim(),
        description: draft.description.trim(),
        current_price: price,
        sub_category_id: draft.sub_category_id,
        active: draft.active,
      };

      setProductList((current) => [nextProduct, ...current]);
    }

    closeModal();
  };

  return (
    <section className="space-y-6">
      <PageHeader
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

      {/* Tarjetas reutilizables */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productList.map((product) => (
          <BusinessCard
            key={product.product_id}
            product={product}
            onClick={() => openEditModal(product)}
          />
        ))}
      </div>

      {/* Modal de creación y edición */}
      <Modal
        open={isModalOpen}
        title={editingProduct ? "Editar producto" : "Crear producto"}
        onClose={closeModal}
      >
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Categoría</span>

            <div className="relative w-full max-w-md">
              <select
                className="w-full appearance-none rounded-xl border border-slate-200 px-3 py-2 pr-10"
                value={draft.category_id}
                onChange={(event) => handleCategoryChange(event.target.value)}
                required
              >
                <option value="">Seleccione una categoría</option>
                {mockCategories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                ▼
              </span>
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Subcategoría</span>

            <div className="relative w-full max-w-md">
              <select
                className="w-full appearance-none rounded-xl border border-slate-200 px-3 py-2 pr-10 disabled:bg-slate-100 disabled:text-slate-400"
                value={draft.sub_category_id}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    sub_category_id: event.target.value,
                  }))
                }
                disabled={!draft.category_id}
                required
              >
                <option value="">
                  {draft.category_id
                    ? "Seleccione una subcategoría"
                    : "Primero seleccione una categoría"}
                </option>

                {subCategories.map((subCategory) => (
                  <option
                    key={subCategory.sub_category_id}
                    value={subCategory.sub_category_id}
                  >
                    {subCategory.name}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                ▼
              </span>
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Nombre</span>
            <input
              className="w-full max-w-md rounded-xl border border-slate-200 px-3 py-2"
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
              className="min-h-24 w-full max-w-md rounded-xl border border-slate-200 px-3 py-2"
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
              className="w-full max-w-md rounded-xl border border-slate-200 px-3 py-2"
              type="number"
              step="100"
              min="0"
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
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  draft.active ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700"
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
