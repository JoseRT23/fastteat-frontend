import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MotionIcon } from 'motion-icons-react'
import { PageHeader } from '../components/ui/PageHeader'
import { mockBusinesses } from '../data/mockData'

interface StorePageProps {
  onSelectBusiness: (businessId: string) => void
}

export default function StorePage({
  onSelectBusiness,
}: StorePageProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredBusinesses = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return mockBusinesses.filter((business) =>
      business.name.toLowerCase().includes(normalizedSearch),
    )
  }, [search])

  const handleOpenProducts = (businessId: string) => {
    onSelectBusiness(businessId)
    navigate('/products')
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Explora nuestros negocios"
        actions={
          <div className="relative w-full md:w-80">
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Busca un negocio..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <MotionIcon
                name="LucideSearch"
                animation="success"
              />
            </div>
          </div>
        }
      />

      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {filteredBusinesses.map((business) => (
            <article
              key={business.business_id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                {business.image ? (
                  <img
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    src={business.image}
                    alt={business.name}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <MotionIcon name="LucideStore" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {business.name}
                  </h2>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <MotionIcon name="LucideStore" />
                  </div>
                </div>

                <div className="space-y-1">
                  {business.address && (
                    <p className="text-sm text-neutral-500">
                      {business.address}
                    </p>
                  )}

                  {business.mobile && (
                    <p className="text-sm text-neutral-500">
                      {business.mobile}
                    </p>
                  )}

                  {business.email && (
                    <p className="truncate text-sm text-neutral-500">
                      {business.email}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleOpenProducts(business.business_id)
                  }
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  Ver productos

                  <MotionIcon name="LucideArrowRight" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-sm shadow-slate-200/60">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <MotionIcon name="LucideSearchX" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No encontramos negocios
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Intenta buscar con otro nombre.
          </p>
        </div>
      )}
    </section>
  )
}