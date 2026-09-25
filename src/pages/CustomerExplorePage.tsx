import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MotionIcon } from "motion-icons-react";
import { PageHeader } from '../components/ui/PageHeader'

interface Business {
  business_id: string
  name: string
  address: string
  menu_url: string
  phone: string
  image?: string
}

const mockBusinesses: Business[] = [
  {
    business_id: 'biz-1',
    name: 'Café del Sol',
    address: 'Av. Principal 45',
    phone: '+34 600 123 456',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      menu_url: '/products',
  },
  {
    business_id: 'biz-2',
    name: 'Bistro Madera',
    address: 'Calle Real 12',
    phone: '+34 600 234 567',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de',
      menu_url: '/products',
  },
  {
    business_id: 'biz-3',
    name: 'La Terraza',
    address: 'Plaza Mayor 8',
    phone: '+34 600 345 678',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      menu_url: '/products',
  },
  {
    business_id: 'biz-4',
    name: 'Sabores de Casa',
    address: 'Calle Central 25',
    phone: '+34 600 456 789',
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
      menu_url: '/products',
  },
  {
    business_id: 'biz-5',
    name: 'El Rincón Gourmet',
    address: 'Carrera 10 #15-20',
    phone: '+34 600 567 890',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      menu_url: '/products',
  },
  {
    business_id: 'biz-6',
    name: 'Delicias Urbanas',
    address: 'Avenida del Parque 18',
    phone: '+34 600 678 901',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      menu_url: '/products',
  },
]

interface CustomerExplorePageProps {
  onSelectBusiness: (businessId: string) => void
}

export function CustomerExplorePage({ onSelectBusiness }: CustomerExplorePageProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredBusinesses = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return mockBusinesses.filter((business) =>
      business.name.toLowerCase().includes(normalizedSearch),
    )
  }, [search])

  const handleOpenProducts = (businessId: string) => {
    onSelectBusiness(businessId)
    navigate('/products')
  }

  return ( <section className="space-y-6"> <PageHeader eyebrow="Catálogo"
        title="Explora nuestros productos"
        description="Descubre los productos disponibles y encuentra lo que buscas."
        actions={
          <div className="relative w-full md:w-80">
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Busca un producto..."
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
        <div className="grid gap-5 md:grid-cols-2">
          {filteredBusinesses.map((business) => (
            <article key={business.business_id}className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[16/8] overflow-hidden bg-slate-100">
                {business.image ? (
                  <img
                    src={business.image}
                    alt={`Imagen de ${business.name}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-400 shadow-sm">
                      {business.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {business.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Descubre los productos disponibles en este negocio.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <MotionIcon name="LucideStore" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenProducts(business.business_id)}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
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
            No encontramos resultados
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Intenta buscar con otro nombre.
          </p>
        </div>
      )}
    </section>
  )
}