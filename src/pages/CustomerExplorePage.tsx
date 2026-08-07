import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Business {
  business_id: string
  name: string
  address: string
  menu_url: string
  phone: string
}

const mockBusinesses: Business[] = [
  {
    business_id: 'biz-1',
    name: 'Café del Sol',
    address: 'Av. Principal 45',
    menu_url: 'https://example.com/cafe-del-sol',
    phone: '+34 600 123 456',
  },
  {
    business_id: 'biz-2',
    name: 'Bistro Madera',
    address: 'Calle Real 12',
    menu_url: 'https://example.com/bistro-madera',
    phone: '+34 600 234 567',
  },
]

interface CustomerExplorePageProps {
  onSelectBusiness: (businessId: string) => void
}

export function CustomerExplorePage({ onSelectBusiness }: CustomerExplorePageProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter((business) =>
      business.name.toLowerCase().includes(search.toLowerCase()) ||
      business.address.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  const handleOpenProducts = (businessId: string) => {
    onSelectBusiness(businessId)
    navigate('/products')
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Buscar negocio</span>
          <h2 className="text-2xl font-bold text-slate-900">Explora negocios cercanos</h2>
        </div>

        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          placeholder="Busca por nombre o dirección"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredBusinesses.map((business) => (
          <article key={business.business_id} className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{business.name}</h3>
                <p className="text-sm text-slate-500">{business.address}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Abierto</span>
            </div>

            <p className="mb-4 text-sm text-slate-500">Menú: {business.menu_url}</p>
            <button
              onClick={() => handleOpenProducts(business.business_id)}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Ver productos
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
