import { useMemo, useState } from "react";
import { MotionIcon } from "motion-icons-react";
import { PageHeader, ProductCard } from "../components/ui";
import type { Product } from "../types";
import CategoryList from "../components/ui/CategoryList";

const categories = [
  { category_id: "cat-1", name: "Hamburguesas", icon: "LucideSandwich" },
  { category_id: "cat-2", name: "Pizzas", icon: "LucidePizza" },
  { category_id: "cat-3", name: "Bebidas", icon: "LucideCupSoda" },
];

const subCategories = [
  { sub_category_id: "sub-1", category_id: "cat-1", name: "Clásicas" },
  { sub_category_id: "sub-2", category_id: "cat-1", name: "Especiales" },
  { sub_category_id: "sub-3", category_id: "cat-2", name: "Tradicionales" },
  { sub_category_id: "sub-4", category_id: "cat-2", name: "Especiales" },
  { sub_category_id: "sub-5", category_id: "cat-3", name: "Gaseosas" },
  { sub_category_id: "sub-6", category_id: "cat-3", name: "Jugos y malteadas" },
];

// Productos de ejemplo. Las calificaciones son ficticias.
const mockProducts: Product[] = [
  {
    product_id: "prod-1",
    sub_category_id: "sub-1",
    name: "Hamburguesa clásica",
    description: "Carne a la parrilla, queso, lechuga y tomate.",
    current_price: 18000,
    active: true,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-2",
    sub_category_id: "sub-1",
    name: "Hamburguesa doble",
    description: "Doble carne, doble queso y salsa especial.",
    current_price: 25000,
    active: true,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-3",
    sub_category_id: "sub-2",
    name: "Hamburguesa BBQ",
    description: "Carne jugosa, salsa BBQ y cebolla caramelizada.",
    current_price: 23000,
    active: true,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-4",
    sub_category_id: "sub-2",
    name: "Hamburguesa especial",
    description: "Carne, tocineta crujiente, queso y salsa de la casa.",
    current_price: 28000,
    active: true,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-5",
    sub_category_id: "sub-3",
    name: "Pizza napolitana",
    description: "Salsa de tomate, mozzarella y albahaca fresca.",
    current_price: 28000,
    active: true,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-6",
    sub_category_id: "sub-3",
    name: "Pizza pepperoni",
    description: "Mozzarella, pepperoni y salsa de la casa.",
    current_price: 32000,
    active: true,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-7",
    sub_category_id: "sub-4",
    name: "Pizza hawaiana",
    description: "Jamón, piña, mozzarella y salsa de tomate.",
    current_price: 30000,
    active: true,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-8",
    sub_category_id: "sub-4",
    name: "Pizza cuatro quesos",
    description: "Una combinación cremosa de cuatro quesos.",
    current_price: 35000,
    active: true,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-9",
    sub_category_id: "sub-5",
    name: "Gaseosa fría",
    description: "Bebida gaseosa servida bien fría.",
    current_price: 5000,
    active: true,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-10",
    sub_category_id: "sub-5",
    name: "Limonada natural",
    description: "Limonada fresca preparada al momento.",
    current_price: 7000,
    active: true,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-11",
    sub_category_id: "sub-6",
    name: "Jugo de naranja",
    description: "Jugo de naranja refrescante.",
    current_price: 8000,
    active: true,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
  },
  {
    product_id: "prod-12",
    sub_category_id: "sub-6",
    name: "Malteada de chocolate",
    description: "Malteada cremosa con delicioso chocolate.",
    current_price: 12000,
    active: true,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  },
];

interface CustomerExplorePageProps {
  onSelectProduct?: (productId: string) => void;
}

export default function CustomerExplorePage({
  onSelectProduct,
}: CustomerExplorePageProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("default");

  // Subcategorías de la categoría seleccionada.
  const visibleSubCategories = useMemo(
    () =>
      subCategories.filter(
        (subCategory) =>
          !selectedCategory || subCategory.category_id === selectedCategory,
      ),
    [selectedCategory],
  );

  // Validación del rango de precios.
  const invalidPriceRange =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);

  // Búsqueda, filtros y ordenamiento.
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const minimumPrice = minPrice === "" ? null : Number(minPrice);
    const maximumPrice = maxPrice === "" ? null : Number(maxPrice);
    const ratingThreshold = Number(minRating);

    if (
      minimumPrice !== null &&
      maximumPrice !== null &&
      minimumPrice > maximumPrice
    ) {
      return [];
    }

    const results = mockProducts.filter((product) => {
      const normalizedName = product.name.toLowerCase();
      const normalizedDescription = (product.description || "").toLowerCase();

      const matchesSearch =
        normalizedName.includes(normalizedSearch) ||
        normalizedDescription.includes(normalizedSearch);

      const subCategory = subCategories.find(
        (item) => item.sub_category_id === product.sub_category_id,
      );

      const matchesCategory =
        !selectedCategory || subCategory?.category_id === selectedCategory;

      const matchesSubCategory =
        !selectedSubCategory || product.sub_category_id === selectedSubCategory;

      const matchesAvailability = !onlyAvailable || product.active;

      const matchesMinPrice =
        minimumPrice === null || product.current_price >= minimumPrice;

      const matchesMaxPrice =
        maximumPrice === null || product.current_price <= maximumPrice;

      const matchesRating = (product.rating ?? 0) >= ratingThreshold;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matchesAvailability &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating
      );
    });

    return [...results].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.current_price - b.current_price;

        case "price-desc":
          return b.current_price - a.current_price;

        case "rating-desc":
          return (b.rating ?? 0) - (a.rating ?? 0);

        case "name-asc":
          return a.name.localeCompare(b.name, "es");

        default:
          return 0;
      }
    });
  }, [
    search,
    selectedCategory,
    selectedSubCategory,
    onlyAvailable,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  // Restablecer todos los filtros.
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setOnlyAvailable(false);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("0");
    setSortBy("default");
  };

  // Cambiar categoría limpia la subcategoría seleccionada.
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
  };

  // Tarjeta reutilizable.
  const renderProductCard = (product: Product) => (
    <ProductCard
      key={product.product_id}
      product={product}
      onClick={
        onSelectProduct ? () => onSelectProduct(product.product_id) : undefined
      }
      actionLabel="Ver producto"
    />
  );

  // Cuadrícula responsive.
  const renderProductGrid = (products: Product[]) => (
    <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map(renderProductCard)}
    </div>
  );

  return (
    <section className="w-full min-w-0 space-y-6 pt-6">
      {/* Título y buscador alineados mediante PageHeader */}
      <PageHeader
        title="Explora nuestros productos"
        actions={
          <div className="relative w-full min-w-0">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto..."
              aria-label="Buscar productos"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />

            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <MotionIcon name="LucideSearch" />
            </div>
          </div>
        }
      />

      {/* Categorías principales */}
      <section className="min-w-0">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          ¿Qué se te antoja hoy?
        </h2>

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Filtros y resultados */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="h-fit min-w-0 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MotionIcon name="LucideSlidersHorizontal" />
              <h2 className="font-bold text-slate-900">Filtrar por:</h2>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Limpiar
            </button>
          </div>

          {/* Subcategoría: solo cuando se elige una categoría */}
          {selectedCategory && visibleSubCategories.length > 0 && (
            <div className="mt-6">
              <label
                htmlFor="subcategory-filter"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Tipo de producto
              </label>

              <select
                id="subcategory-filter"
                value={selectedSubCategory}
                onChange={(event) => setSelectedSubCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
              >
                <option value="">Todos los tipos</option>

                {visibleSubCategories.map((subCategory) => (
                  <option
                    key={subCategory.sub_category_id}
                    value={subCategory.sub_category_id}
                  >
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rango de precios */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              Rango de precio (COP)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <label
                  htmlFor="min-price"
                  className="mb-1 block text-xs text-slate-500"
                >
                  Mínimo
                </label>

                <input
                  id="min-price"
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="$ 0"
                  className="w-full min-w-0 rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="max-price"
                  className="mb-1 block text-xs text-slate-500"
                >
                  Máximo
                </label>

                <input
                  id="max-price"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Sin límite"
                  className="w-full min-w-0 rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            {invalidPriceRange && (
              <p className="mt-2 text-xs text-red-600" role="alert">
                El precio mínimo no puede superar el máximo.
              </p>
            )}
          </div>

          {/* Calificación mínima */}
          <div className="mt-5">
            <label
              htmlFor="rating-filter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Calificación
            </label>

            <select
              id="rating-filter"
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
            >
              <option value="0">Todas las calificaciones</option>
              <option value="3">3 estrellas o más</option>
              <option value="4">4 estrellas o más</option>
              <option value="4.5">4,5 estrellas o más</option>
              <option value="5">5 estrellas</option>
            </select>
          </div>

          {/* Disponibilidad */}
          <label className="mt-5 flex cursor-pointer items-center gap-3 border-t border-slate-100 pt-5 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(event) => setOnlyAvailable(event.target.checked)}
              className="h-4 w-4 shrink-0 rounded accent-slate-900"
            />

            <span>Solo productos disponibles</span>
          </label>
        </aside>

        {/* Resultados */}
        <div className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedCategory
                  ? categories.find(
                      (category) => category.category_id === selectedCategory,
                    )?.name
                  : "Todos los productos"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "producto encontrado"
                  : "productos encontrados"}
              </p>
            </div>

            <label className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
              <span className="shrink-0">Ordenar:</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Ordenar productos"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-medium text-slate-800 sm:flex-none"
              >
                <option value="default">Recomendados</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="rating-desc">Mejor calificación</option>
                <option value="name-asc">Nombre: A-Z</option>
              </select>
            </label>
          </div>

          {/* Cuadrícula o productos agrupados por categoría */}
          {filteredProducts.length > 0 ? (
            selectedCategory ? (
              renderProductGrid(filteredProducts)
            ) : (
              <div className="space-y-8">
                {categories.map((category) => {
                  const categoryProducts = filteredProducts.filter(
                    (product) => {
                      const subCategory = subCategories.find(
                        (item) =>
                          item.sub_category_id === product.sub_category_id,
                      );

                      return subCategory?.category_id === category.category_id;
                    },
                  );

                  if (categoryProducts.length === 0) {
                    return null;
                  }

                  return (
                    <section
                      key={category.category_id}
                      className="min-w-0 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {category.name}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {categoryProducts.length}{" "}
                          {categoryProducts.length === 1
                            ? "producto"
                            : "productos"}
                        </span>
                      </div>

                      {renderProductGrid(categoryProducts)}
                    </section>
                  );
                })}
              </div>
            )
          ) : (
            <div className="rounded-3xl border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">
              <div className="flex justify-center text-slate-400">
                <MotionIcon name="LucideSearchX" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {invalidPriceRange
                  ? "Revisa el rango de precios"
                  : "No encontramos productos"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {invalidPriceRange
                  ? "El precio mínimo debe ser menor o igual al máximo."
                  : "Prueba con otra búsqueda o cambia los filtros."}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
