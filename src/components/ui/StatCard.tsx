interface StatCardProps {
  label: string
  value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <strong className="block text-3xl font-bold text-neutral-900">{value}</strong>
      <span className="text-sm text-neutral-500">{label}</span>
    </article>
  )
}