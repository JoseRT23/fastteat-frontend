import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Button, PageHeader, BusinessCard } from "../components/ui";
import { apiService } from "../services/apiService";
import { useAppContext } from "../context/AppContext";

import type { Product } from "../types";

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

const emptyDraft = (): ProductFormState => ({
  name: "",
  description: "",
  current_price: "",
  category_id: "",
  sub_category_id: "",
  active: true,
});

export function ProductsPage() {
  const { currentUser } = useAppContext();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draft, setDraft] = useState<ProductFormState>(emptyDraft());
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    loadProducts()
  }, []);

  const loadProducts = () => {
    apiService.getProducts()
      .then(products => setProductList(products.data))
      .catch(error => console.log(error))
  }

  const loadSubCategories = async (categoryId: string) => {
    if (!categoryId) {
      setSubCategories([]);
      return;
    }

    const subCategories = await apiService.getSubCategoriesByCategory(categoryId);
    setSubCategories(subCategories)
  };

  const openCreateModal = async () => {
    setEditingProduct(null);
    const categories = await apiService.getCategories();
    setCategories(categories);
    setDraft(emptyDraft());
    setIsModalOpen(true);
  };

  const openEditModal = async (product: Product) => {
    setEditingProduct(product);

    const categories = await apiService.getCategories();
    setCategories(categories);
    const subCategories = await apiService.getSubCategories(product.sub_category_id);
    setSubCategories(subCategories)
    const categoryId = subCategories[0]?.category_id ?? "";

    setDraft({
      name: product.name,
      description: product.description,
      current_price: product.current_price.toString(),
      category_id: categoryId,
      sub_category_id: product.sub_category_id ?? "",
      active: product.active,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setSubCategories([]);
    setDraft(emptyDraft());
    loadProducts();
  };

  const handleCategoryChange = (categoryId: string) => {
    setDraft((current) => ({
      ...current,
      category_id: categoryId,
      sub_category_id: "",
    }));

    loadSubCategories(categoryId);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
      const nextProduct: Product = {
        business_id: editingProduct.business_id,
        sub_category_id: draft.sub_category_id,
        name: draft.name.trim(),
        description: draft.description.trim(),
        current_price: price,
        active: draft.active,
      };

      await apiService.updateProduct(editingProduct.product_id!, nextProduct);
    } else {
      const businessId = currentUser?.business_id ?? "";
      if (!businessId) {
        throw "El usuario no puede crear productos";
      }

      const nextProduct: Product = {
        business_id: businessId,
        sub_category_id: draft.sub_category_id,
        name: draft.name.trim(),
        description: draft.description.trim(),
        current_price: price,
        active: draft.active,
      };

      await apiService.createProduct(nextProduct);
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
                {categories.map((category) => (
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
