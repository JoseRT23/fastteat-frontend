import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MotionIcon } from "motion-icons-react";
import { PageHeader } from "../components/ui/PageHeader";
import { mockBusinesses } from "../data/mockData";
import CategoryList from "../components/ui/CategoryList";

const categories = [
  { category_id: "cat-1", name: "Hamburguesas", icon: "LucideSandwich" },
  { category_id: "cat-2", name: "Pizzas", icon: "LucidePizza" },
  { category_id: "cat-3", name: "Bebidas", icon: "LucideCupSoda" },
];

interface StorePageProps {
  onSelectBusiness: (businessId: string) => void;
}

export default function StorePage({ onSelectBusiness }: StorePageProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("default");

  const filteredBusinesses = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es");
    const ratingThreshold = Number(minRating);

    const results = mockBusinesses.filter((business) => {
      const name = business.name.toLocaleLowerCase("es");
      const address = (business.address ?? "").toLocaleLowerCase("es");

      const matchesSearch =
        normalizedSearch === "" ||
        name.includes(normalizedSearch) ||
        address.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "" ||
        (business.category_ids ?? []).includes(selectedCategory);

      const matchesRating = (business.rating ?? 0) >= ratingThreshold;

      return matchesSearch && matchesCategory && matchesRating;
    });

    return [...results].sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return (b.rating ?? 0) - (a.rating ?? 0);

        case "name-asc":
          return a.name.localeCompare(b.name, "es");

        case "name-desc":
          return b.name.localeCompare(a.name, "es");

        default:
          return 0;
      }
    });
  }, [search, selectedCategory, minRating, sortBy]);

  const handleOpenProducts = (businessId: string) => {
    onSelectBusiness(businessId);
    navigate("/products");
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinRating("0");
    setSortBy("default");
  };

  return (
    <section className="w-full min-w-0 space-y-6 pt-6">
      {/* Encabezado y búsqueda */}
      <PageHeader
        title="Explora nuestros negocios"
        actions={
          <div className="relative w-full min-w-0 md:w-80">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busca un negocio..."
              aria-label="Buscar negocios"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />

            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <MotionIcon name="LucideSearch" />
            </div>
          </div>
        }
      />

      {/* Categorías */}
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
              className="shrink-0 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Limpiar
            </button>
          </div>

          {/* Filtro por calificación */}
          <div className="mt-6">
            <label
              htmlFor="business-rating-filter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Calificación
            </label>

            <select
              id="business-rating-filter"
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              <option value="0">Todas las calificaciones</option>
              <option value="3">3 estrellas o más</option>
              <option value="4">4 estrellas o más</option>
              <option value="4.5">4,5 estrellas o más</option>
              <option value="5">5 estrellas</option>
            </select>
          </div>
        </aside>

        {/* Lista de negocios */}
        <div className="min-w-0">
          {/* Encabezado de resultados y ordenamiento */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedCategory
                  ? categories.find(
                      (category) => category.category_id === selectedCategory,
                    )?.name
                  : "Todos los negocios"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredBusinesses.length}{" "}
                {filteredBusinesses.length === 1
                  ? "negocio encontrado"
                  : "negocios encontrados"}
              </p>
            </div>

            <label className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
              <span className="shrink-0">Ordenar:</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Ordenar negocios"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:flex-none"
              >
                <option value="default">Recomendados</option>
                <option value="rating-desc">Mejor calificación</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
              </select>
            </label>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredBusinesses.map((business) => (
                <article
                  key={business.business_id}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Imagen y calificación */}
                  <div className="relative aspect-[16/8] shrink-0 overflow-hidden bg-slate-100">
                    {business.image ? (
                      <img
                        src={business.image}
                        alt={`Imagen de ${business.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-400 shadow-sm">
                          {business.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}

                    {/* Insignia de calificación */}
                    {typeof business.rating === "number" && (
                      <div
                        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm"
                        aria-label={`Calificación: ${business.rating.toFixed(1)} de 5`}
                      >
                        <span
                          aria-hidden="true"
                          className="text-sm leading-none text-amber-500"
                        >
                          ★
                        </span>

                        <span className="text-xs font-bold text-slate-800">
                          {business.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Información del negocio */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* Nombre */}
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Ícono más cerca del margen */}
                      <div className="-ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <MotionIcon name="LucideStore" />
                      </div>

                      {/* Nombre del negocio */}
                      <h3 className="min-w-0 flex-1 break-words text-xl font-bold leading-7 text-slate-900">
                        {business.name}
                      </h3>
                    </div>

                    {/* Dirección */}
                    {business.address && (
                      <p className="mt-1 flex items-start gap-2 break-words text-sm leading-5 text-slate-500">
                        <span className="mt-0.5 shrink-0">
                          <MotionIcon name="LucideMapPin" />
                        </span>
                        <span className="min-w-0">{business.address}</span>
                      </p>
                    )}

                    {/* Teléfono */}
                    {business.mobile && (
                      <p className="mt-0.5 flex items-start gap-2 break-words text-sm leading-5 text-slate-500">
                        <span className="mt-0.5 shrink-0">
                          <MotionIcon name="LucidePhone" />
                        </span>
                        <span className="min-w-0">{business.mobile}</span>
                      </p>
                    )}

                    {/* Calificación no disponible */}
                    {typeof business.rating !== "number" && (
                      <p className="mt-3 text-xs text-slate-500">
                        Sin calificación
                      </p>
                    )}

                    {/* Botón con espacio adicional */}
                    <button
                      type="button"
                      onClick={() => handleOpenProducts(business.business_id)}
                      className="mt-2 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                      Ver productos
                      <MotionIcon name="LucideArrowRight" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Estado sin resultados */
            <div className="rounded-3xl border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">
              <div className="flex justify-center text-slate-400">
                <MotionIcon name="LucideSearchX" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No encontramos negocios
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Prueba con otra búsqueda o cambia los filtros.
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
